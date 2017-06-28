import {asyncReactor} from 'async-reactor';
import {Loader} from './Loader';
import {Error} from './Error';

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function ErrorComponent() {
  await sleep(1000);

  throw new Error('foo');
}

export default asyncReactor(ErrorComponent, Loader, Error);
