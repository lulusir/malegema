import imgF1 from '@/assets/feng_1.png';
import imgF2 from '@/assets/feng_2.png';
import imgF3 from '@/assets/feng_3.png';
import imgF4 from '@/assets/feng_4.png';
import imgF5 from '@/assets/feng_5.png';
import imgF6 from '@/assets/feng_6.png';
import imgF7 from '@/assets/feng_7.png';

export enum EBlockType {
  dong,
  xi,
  nan,
  bei,
  zhong,
  fa,
  bai,
}

export const ImagesMap = {
  [EBlockType.dong]: imgF1,
  [EBlockType.xi]: imgF2,
  [EBlockType.nan]: imgF3,
  [EBlockType.bei]: imgF4,
  [EBlockType.zhong]: imgF5,
  [EBlockType.fa]: imgF6,
  [EBlockType.bai]: imgF7,
};
