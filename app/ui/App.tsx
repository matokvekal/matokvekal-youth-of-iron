'use client';
import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { useI18n, useScopedI18n } from 'locales/client';
import { TweetMock } from 'components/Tweet';
import { ActionsRow } from 'components/ActionRow';
import { usePlatformActions } from 'hooks/usePlatformIntents';
import { usePostFetcher } from 'hooks/usePostFetcher';
import KudosDialog from 'dialogs/KudosDialog';
import InstructionsDialog from 'dialogs/InstructionsDialog';
import { PlatformSwitcher } from 'components/PlatformSwitcher';
import { Card } from 'components/Card';
import { Button } from 'components/Button';
import Header from 'components/Header';
import { Icon } from 'components/icons';
import useDailyProgress from 'hooks/useDailyProgress';
import GetNotifiedDialog from 'dialogs/GetNotifiedDialog';
import { Platform } from 'types/internal';
import { IntentContext, PlatformContext } from 'providers';
import { Footer } from 'components/Footer';

export default function AppUi() {
  const embedContainerRef = useRef<HTMLDivElement>(null);
  const [embedWidth, setEmbedWidth] = useState(0);
  const { intent } = useContext(IntentContext);
  const { platform } = useContext(PlatformContext);
  const t = useI18n();
  const t2 = useScopedI18n(intent);
  const t3 = useScopedI18n(`${intent}.${platform}`);
  const [url, refetch] = usePostFetcher(intent, platform);
  const { score, oldScore, incrementScore } = useDailyProgress();

  useLayoutEffect(() => {
    setEmbedWidth(embedContainerRef.current?.offsetWidth ?? 0);
  }, []);

  const {
    primaryActionOnClick,
    dialogsState,
    setDialogsState,
    dismissDialog,
    Embed,
    tutorialDialogOnSubmit,
    tutorialDialogContent,
  } = usePlatformActions({
    platform,
    intent,
    platformUrl: url,
  });

  const handlePrimaryAction = () => {
    primaryActionOnClick();
    incrementScore(2);
  };

  const embedComponent = React.useCallback(() => {
    if (!url || !url.length || !embedWidth) return <TweetMock />;
    return (
      <Embed
        embedPlaceholder={<TweetMock />}
        placeholderSpinnerDisabled
        width={platform === Platform.Facebook ? embedWidth - 2 : '100%'} // facebook fluid width not working well...
        key={url}
        url={url}
      />
    );
  }, [url, Embed, platform, embedWidth]);

  const actionRowActions = [
    {
      label: t2('action_btn'),
      onClick: handlePrimaryAction,
      icon: <Icon.Message />,
      id: `${intent}-cta-bottom-${platform}-post-reply-selection`,
    },
    {
      label: t('new_post_btn'),
      onClick: refetch,
      icon: <Icon.Refresh />,
      variant: 'outline',
      id: `${intent}-new-post-bottom-${platform}`,
    },
  ];

  const handleOpenNotifiedDialog = () => {
    setDialogsState((state) => {
      state.getNotified.isOpen = true;
      state.getNotified.hideRefetchBtn = true;
    });
  };

  return (
    <>
      <div className='h-full'>
        <Header onGetNotifiedOpen={handleOpenNotifiedDialog} />
        <div className='px-4 pt-4'>
          <PlatformSwitcher />
        </div>

        <div className='h-full px-4'>
          <Card.Container className='my-4'>
            <Card.Header>
              <Button
                id={`${intent}-cta-top-${platform}`}
                className='flex-grow px-0'
                onClick={handlePrimaryAction}
              >
                <Icon.Message />
                {t2('action_btn')}
              </Button>
            </Card.Header>
            <Card.Content>
              <div ref={embedContainerRef} className='relative min-h-[25vh] w-full overflow-hidden'>
                {embedComponent()}
              </div>
            </Card.Content>
            <Card.Footer className='flex w-full flex-grow'>
              <ActionsRow actions={actionRowActions} />
            </Card.Footer>
          </Card.Container>

          <KudosDialog
            userProgress={score}
            oldScore={oldScore}
            intent={intent}
            isOpen={dialogsState.kudos.isOpen}
            onClose={() => {
              setDialogsState((d) => {
                d.kudos.isOpen = false;
                if (!d.getNotified.dismissed[platform]) {
                  d.getNotified.isOpen = true;
                  d.getNotified.hideRefetchBtn = false;
                } else {
                  refetch();
                }
              });
            }}
          />
          {tutorialDialogContent && (
            <InstructionsDialog
              isOpen={dialogsState.instructions.isOpen}
              onClose={() => {
                setDialogsState((d) => {
                  d.instructions.isOpen = false;
                });
              }}
              openPost={tutorialDialogOnSubmit || (() => null)}
              onDismiss={dismissDialog}
              title={t3('tutorial_dialog_title')}
              subtitle={''}
            >
              {tutorialDialogContent}
            </InstructionsDialog>
          )}
          <GetNotifiedDialog
            isOpen={dialogsState.getNotified.isOpen}
            hideReloadBtn={dialogsState.getNotified.hideRefetchBtn}
            onDismiss={() => {
              refetch();
              setDialogsState((d) => {
                d.getNotified.isOpen = false;
                Object.values(Platform).forEach((p) => {
                  d.getNotified.dismissed[p] = true;
                });
              });
            }}
            onSubmit={() => {
              refetch();
              setDialogsState((d) => {
                d.getNotified.isOpen = false;
                Object.values(Platform).forEach((p) => {
                  d.getNotified.dismissed[p] = true;
                });
              });
            }}
            onClose={() => {
              setDialogsState((d) => {
                d.getNotified.isOpen = false;
                Object.values(Platform).forEach((p) => {
                  d.getNotified.dismissed[p] = true;
                });
              });
            }}
          />
        </div>
      </div>
      <div className='p-4 pt-0'>
        <Footer onGetNotifiedOpen={handleOpenNotifiedDialog} />
      </div>
    </>
  );
}
