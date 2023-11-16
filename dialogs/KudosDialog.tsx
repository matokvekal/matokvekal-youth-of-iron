'use client';
import { useI18n, useScopedI18n } from 'locales/client';
import { Intent } from 'types/internal';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from 'components/Dialog';
import { Button } from 'components/Button';
import ProgressGauge from 'components/Guage';

interface Props {
  intent: Intent;
  isOpen: boolean;
  userProgress: number;
  oldScore: number;
  onClose: () => void;
}

function KudosDialog({ isOpen, intent, userProgress, oldScore, onClose }: Props) {
  const t = useI18n();
  const t2 = useScopedI18n(intent);

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <div className='flex flex-col items-center justify-center  text-center'>
          <ProgressGauge oldProgress={oldScore * 10} progress={userProgress * 10}>
            {t('kudos_progress_title')}
          </ProgressGauge>
          <div>
            <div className='-mt-6'>
              <DialogTitle className='mb-2'>{t('kudos_title')}</DialogTitle>
              <p className='mx-auto mb-2 max-w-[500px] px-4 text-slate-500 '>
                {t('kudos_subtitle')}
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild onClick={onClose}>
            <Button
              id={userProgress === 10 ? 'kudos-next-final' : 'kudos-next-post'}
              className='flex-grow'
            >
              {userProgress === 10 ? t2('kudos_cta_final') : t2('kudos_cta')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default KudosDialog;
