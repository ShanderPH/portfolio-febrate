import localFont from 'next/font/local'

export const lexendDeca = localFont({
  src: [
    {
      path: '../app/fonts/LexendDeca-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../app/fonts/LexendDeca-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../app/fonts/LexendDeca-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-lexend-deca',
  display: 'swap',
})
