/* eslint-disable no-console */
import { copyFile, readdir } from 'fs';

const getDirectories = (
  source: string,
  callback: (apps: string[]) => void,
) => {
  readdir(source, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log('Could not find directories', err);
    } else {
      callback(
        files
          .filter((dirent) => dirent.isDirectory())
          .map((dirent) => dirent.name),
      );
    }
  });
};

getDirectories('./apps', (apps) => {
  for (const app of apps) {
    copyFile('./.env', `./apps/${app}/.env`, (err) => {
      if (err) console.error(`Could not copy .env into ${app}`, err);
      else console.log(`.env was copied to ${app}`);
    });
  }
});
