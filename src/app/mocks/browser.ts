
import { setupWorker } from 'msw/browser';
import { isDevMode } from '@angular/core'
import { PlanoAcaoMock } from './plano-acao-mock';

export const setupMsw = async () => {
  // if (isDevMode()) {
  //   return;
  // }

  const worker = setupWorker(...PlanoAcaoMock);
  await worker.start();
};