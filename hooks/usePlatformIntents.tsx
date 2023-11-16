import { openURL } from 'utils/device';
import { extractTweetId } from 'utils/extracttwitterId';
import {
  Platform,
  Intent,
  IntentConfig,
  TutorialIntentConfig,
  PlatformConfig,
  SocialMediaEmbedProps,
} from 'types/internal';
import { FacebookEmbed, InstagramEmbed, TikTokEmbed } from 'react-social-media-embed';
import { getReplyMessageContent, twitterReplyToPostLink } from 'utils/platformActions';
import {
  InstagramReportInstructions,
  InstagramShareInstructionsContent,
  TwitterReportInstructionsContent,
} from 'dialogs/DialogInstructionContents';
import { useDialogs } from './useDialogs';
import { ReactNode, useState } from 'react';
import { useCopyToClipboard } from './useCopyToClipboard';
import { useTabRefocus } from './useTabRefocus';
import { TwitterEmbed } from 'components/Tweet';

const createPlatformIntent = (c: IntentConfig): IntentConfig => {
  const commonProps = {
    primaryAction: c.primaryAction,
  };

  if (c.hasTutorial) {
    return {
      ...commonProps,
      hasTutorial: true,
      tutorialDialogContent: (c as TutorialIntentConfig).tutorialDialogContent,
      tutorialDialogOnSubmit: (c as TutorialIntentConfig).tutorialDialogOnSubmit,
    };
  } else {
    return {
      ...commonProps,
      hasTutorial: false,
    };
  }
};

export const usePlatformActions = ({
  platform,
  intent,
  platformUrl,
}: {
  platform: Platform;
  intent: Intent;
  platformUrl: string | undefined;
}) => {
  const { dialogsState, setDialogsState, dismissDialog } = useDialogs();
  const [_, copyToClipboard] = useCopyToClipboard();
  const [hasNavigatedAway, setHasNavigatedAway] = useState(false);

  useTabRefocus(
    () => {
      setTimeout(() => {
        setDialogsState((d) => {
          d.kudos.isOpen = true;
          d.instructions.isOpen = false;
        });
        setHasNavigatedAway(false);
      }, 200);
    },
    { condition: hasNavigatedAway },
  );

  const handleGoToPlatform = () => {
    if (!platformUrl) return;

    const message = getReplyMessageContent();
    copyToClipboard(message);

    if (platform === Platform.Twitter && intent === Intent.Share) {
      const tweetId = extractTweetId(platformUrl);
      if (tweetId) openURL(twitterReplyToPostLink(tweetId, message));
    } else {
      openURL(platformUrl);
    }

    setHasNavigatedAway(true);
  };

  const openInstructionsDialog = () =>
    setDialogsState((d) => {
      d.instructions.isOpen = true;
    });

  const handlePrimaryActionOnClick = () => {
    if (!dialogsState.instructions.dismissed[platform]) {
      openInstructionsDialog();
    } else {
      handleGoToPlatform();
    }
  };

  const withDeeplinkPostPlatform: Record<Intent, IntentConfig> = {
    share: createPlatformIntent({
      primaryAction: handleGoToPlatform,
      hasTutorial: false,
    }),
    report: createPlatformIntent({
      primaryAction: handlePrimaryActionOnClick,
      hasTutorial: true,
      tutorialDialogContent: <TwitterReportInstructionsContent />,
      tutorialDialogOnSubmit: handleGoToPlatform,
    }),
  };

  const withInstructionsToPostPlatform: Record<Intent, IntentConfig> = {
    share: createPlatformIntent({
      primaryAction: handlePrimaryActionOnClick,
      hasTutorial: true,
      tutorialDialogContent: <InstagramShareInstructionsContent />,
      tutorialDialogOnSubmit: handleGoToPlatform,
    }),
    report: createPlatformIntent({
      primaryAction: handlePrimaryActionOnClick,
      hasTutorial: true,
      tutorialDialogContent: <InstagramReportInstructions />,
      tutorialDialogOnSubmit: handleGoToPlatform,
    }),
  };

  const platformConfigs: Record<Platform, PlatformConfig> = {
    [Platform.Twitter]: withDeeplinkPostPlatform,
    [Platform.Instagram]: withInstructionsToPostPlatform,
    [Platform.Facebook]: withInstructionsToPostPlatform,
    [Platform.TikTok]: withInstructionsToPostPlatform,
  };

  const Embeds: Record<Platform, (p: SocialMediaEmbedProps) => ReactNode> = {
    [Platform.Twitter]: TwitterEmbed,
    [Platform.Instagram]: InstagramEmbed,
    [Platform.Facebook]: FacebookEmbed,
    [Platform.TikTok]: TikTokEmbed,
  };

  const platformStrategy = platformConfigs[platform];
  if (!platformStrategy) {
    throw new Error(`Unsupported platform: ${platform}`);
  }

  const Embed = Embeds[platform];
  const actions = platformStrategy[intent];

  return {
    dialogsState,
    setDialogsState,
    dismissDialog: () => dismissDialog(platform),
    primaryActionOnClick: actions.primaryAction,
    Embed,
    tutorialDialogContent: actions.hasTutorial ? actions.tutorialDialogContent : null,
    tutorialDialogOnSubmit: actions.hasTutorial ? actions.tutorialDialogOnSubmit : null,
  };
};
