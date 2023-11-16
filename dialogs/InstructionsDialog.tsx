'use client';
import { useI18n, useScopedI18n } from 'locales/client';
import { FC, PropsWithChildren, ReactNode, useContext } from 'react';
import { Platform } from 'types/internal';
import {
  Dialog,
  DialogAction,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogXClose,
} from 'components/Dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { IntentContext, PlatformContext } from 'providers';

interface Props {
  title: ReactNode;
  subtitle?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  openPost: () => void;
  onDismiss?: () => void;
}

const InstructionsDialog: FC<PropsWithChildren<Props>> = ({
  title,
  subtitle,
  isOpen,
  onClose,
  openPost,
  children,
}) => {
  const { platform } = useContext(PlatformContext);
  const { intent } = useContext(IntentContext);
  const t = useI18n();
  const t2 = useScopedI18n(intent);

  const hasSubtitle = subtitle !== 'tutorial_dialog_subtitle';

  return (
    <Dialog open={isOpen}>
      <DialogContent className='max-w-[525px]'>
        <DialogXClose onClick={onClose} />
        <DialogHeader>
          <DialogTitle className='mb-2'>{title}</DialogTitle>
          {hasSubtitle && <DialogDescription>{subtitle}</DialogDescription>}
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogAction id={`${intent}-instructions-dialog-${platform}-cta`} onClick={openPost}>
            {t2('insturctions_go_to_post_btn') + t(platform as Platform)}
          </DialogAction>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InstructionsDialog;
