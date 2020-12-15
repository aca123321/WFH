import { Router } from 'express';
// import listMediaFilesFromDir, { getFilePath } from './lister';
import lister from './Lister';
import { BASE_MEDIA_DIR } from '../config';
import * as fs from 'fs';

const router: Router = Router();

router.get('/api/ping', (_req, res, _next) => {
  res.json('pong');
});

router.get('/api/getMediaFiles', (_req, res, _next) => {
  const mediaArray = lister.listMediaFilesFromDir(BASE_MEDIA_DIR);
  res.status(200).json({
    message: 'Success',
    mediaFiles: mediaArray,
    numberOfItems: mediaArray.length
  });
});

router.get('/api/stream', (req, res, next) => {
  const path = lister.getFilePath(req.query.id as string);
  if (!path) res.end(404);
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunksize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4'
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4'
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

// router.get('*', (_req, res) => {
//   res.redirect('/');
// });

router.get('/api/categories', (req, res) => {
  const mediaArray = lister.categorise();
  res.status(200).json({
    message: 'success',
    mediaFiles: mediaArray,
    numberOfItems: mediaArray.length
  });
});

export default router;
