import * as fs from 'fs';
import * as path from 'path';
import * as mime from 'mime-types';

import { CATEGORIES } from '../config';
import { VideoItemProps, VideoItemPropsExtended } from '../shared/Video';

class Lister {
  mediaFiles: VideoItemPropsExtended[] = [];

  listMediaFilesInDirRec = (dir: string, category?: string) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self: Lister = this;
    let cat = 'Generic Media';
    // eslint-disable-next-line eqeqeq
    if (category != undefined) {
      cat = category;
    }

    fs.readdirSync(dir).forEach(function(file) {
      if (file !== 'node_modules') {
        let filePath = '';
        filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
          self.listMediaFilesInDirRec(filePath, category);
        } else {
          const ext = path.extname(filePath);
          const contentType = mime.lookup(ext);

          if (contentType !== false) {
            const lookup: string | false = mime.lookup(ext);
            const isVideo: boolean =
              lookup && lookup.includes('video') && !lookup.includes('mp2t');
            isVideo &&
              self.mediaFiles.push({
                title: file,
                url: `/vid/${self.mediaFiles.length}`,
                path: filePath,
                category: cat
              });
          }
        }
      }
    });
  };

  listMediaFilesFromDir = (dir = __dirname) => {
    this.mediaFiles = [];
    this.listMediaFilesInDirRec(dir);
    const ret = this.mediaFiles.map(function(Media) {
      return {
        url: Media.url,
        title: Media.title
      };
    });
    return ret;
  };

  getFilePath = (id: string) => {
    const mediaObject = this.mediaFiles.find(
      video => video.url.substring(5) === id
    );
    if (mediaObject) return mediaObject.path;
    return null;
  };

  categorise = () => {
    this.mediaFiles = [];
    CATEGORIES.forEach((value: string, key: string) => {
      console.log(key + ' -> ' + value);
      this.listMediaFilesInDirRec(value, key);
    });
    return this.mediaFiles;
  };
}

const lister = new Lister();
export default lister;
