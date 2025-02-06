
import { setupWorker } from 'msw/browser';
import { isDevMode } from '@angular/core'
import { PlanoAcaoMock } from './plano-acao-mock';
import { StatusPlanoAcaoMock } from './status-plano-acao-mock';

export const setupMsw = async () => {
  // if (isDevMode()) {
  //   return;
  // }

  const worker = setupWorker(...PlanoAcaoMock.concat(StatusPlanoAcaoMock));
  await worker.start();
};