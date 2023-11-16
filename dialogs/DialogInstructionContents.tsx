'use client';
import { Button } from 'components/Button';
import { StepItem, Stepper } from 'components/Stepper';
import { Textarea } from 'components/TextArea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/Tooltip';
import { Icon } from 'components/icons';
import { REPLY_HASHTAGS } from 'constants/index';
import { useCopyToClipboard } from 'hooks/useCopyToClipboard';
import { useI18n, useScopedI18n } from 'locales/client';
import { IntentContext, PlatformContext } from 'providers';
import { useContext, useEffect, useRef, useState } from 'react';
import { Intent, Platform } from 'types/internal';
import { trackButtonClick } from 'utils/events';
import { getReplyMessageContent } from 'utils/platformActions';

const TwitterReportInstructionsContent = () => {
  const t = useI18n();
  return (
    <ol className='mb-2 max-w-md list-inside list-decimal space-y-1 text-base [&>li]:mt-2'>
      <li>{`${t('report_first_step')}`}</li>
      <li>{`${t('report_second_step')}`}</li>
      <li>{`${t('report_third_step')}`}</li>
      <li>{`${t('report_forth_step')}`}</li>
      <li>{`${t('report_fifth_step')}`}</li>
    </ol>
  );
};

const InstagramShareInstructionsContent = () => {
  const { intent } = useContext(IntentContext);
  const { platform } = useContext(PlatformContext);
  const t = useI18n();
  const t3 = useScopedI18n(`${intent}.${platform}`);
  const [isCopied, setIsCopied] = useState<'button' | 'textarea' | boolean>(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  const handleCopy = (e: React.MouseEvent<HTMLTextAreaElement | HTMLButtonElement>) => {
    if (textAreaRef.current) {
      copy(textAreaRef.current?.value);
      if (e.target instanceof HTMLTextAreaElement) {
        setIsCopied('textarea');
      } else {
        setIsCopied('button');
      }
    }
  };

  const steps: StepItem[] = [
    {
      title: t3('tutorial_dialog_proposed_text_copy_instructions'),
      body: (
        <div className='relative flex flex-col gap-4'>
          <Tooltip open={isCopied === 'textarea'}>
            <TooltipContent>{t('copied_to_clipboard')}</TooltipContent>
            <TooltipTrigger>
              <Textarea
                dir='ltr'
                ref={textAreaRef}
                onClick={handleCopy}
                className='resize-none'
                rows={5}
                defaultValue={getReplyMessageContent() + ' ' + REPLY_HASHTAGS}
                readOnly
              />
            </TooltipTrigger>
          </Tooltip>
          <Tooltip open={isCopied === 'button'}>
            <TooltipContent>{t('copied_to_clipboard')}</TooltipContent>
            <TooltipTrigger asChild>
              <Button
                id={`${intent}-instructions-dialog-${platform}-copy`}
                variant='outline'
                onClick={handleCopy}
                type='button'
              >
                <Icon.Copy />
                {t3('tutorial_dialog_copy_to_clipboard')}
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </div>
      ),
      icon: '1',
    },
    {
      title: t3('tutorial_dialog_paste_in_platform'),
      body: null,
      icon: '2',
    },
  ];

  const [_, copy] = useCopyToClipboard();
  return (
    <TooltipProvider>
      <Stepper items={steps} />
    </TooltipProvider>
  );
};

const InstagramReportInstructions = () => {
  const t3 = useScopedI18n(`${Intent.Report}.${Platform.Instagram}`);
  return (
    <ol
      style={{ listStyleType: 'decimal', listStylePosition: 'inside' }}
      className='mb-2 max-w-md list-inside list-decimal space-y-1 text-base'
    >
      <li>{`${t3('openPost')}`}</li>
      <li>{`${t3('tapThreeDots')}`}</li>
      <li>{`${t3('clickReport')}`}</li>
      <li>{`${t3('selectType')}`}</li>
      <li>{`${t3('clickClose')}`}</li>
    </ol>
  );
};

export {
  TwitterReportInstructionsContent,
  InstagramShareInstructionsContent,
  InstagramReportInstructions,
};
