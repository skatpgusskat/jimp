import { Jimp, mkJGD } from './test-helper';

describe('Autocrop', () => {
    it('image with transparent surround color', async () => {
        const imgSrc = await Jimp.read(
            mkJGD(
                '          ',
                '    ◆◆    ',
                '   ◆▦▦◆   ',
                '  ◆▦▦▦▦◆  ',
                '   ◆▦▦◆   ',
                '    ◆◆    ',
                '          '
            )
        );

        imgSrc
            .autocrop()
            .getJGDSync()
            .should.be.sameJGD(
                mkJGD('  ◆◆  ', ' ◆▦▦◆ ', '◆▦▦▦▦◆', ' ◆▦▦◆ ', '  ◆◆  ')
            );
    });

    it('image with opaque surround color', async () => {
        const imgSrc = await Jimp.read(
            mkJGD(
                '▥▥▥▥▥▥▥▥▥▥',
                '▥▥▥▥◆◆▥▥▥▥',
                '▥▥▥◆▦▦◆▥▥▥',
                '▥▥◆▦▦▦▦◆▥▥',
                '▥▥▥◆▦▦◆▥▥▥',
                '▥▥▥▥◆◆▥▥▥▥',
                '▥▥▥▥▥▥▥▥▥▥'
            )
        );

        imgSrc
            .autocrop()
            .getJGDSync()
            .should.be.sameJGD(
                mkJGD('▥▥◆◆▥▥', '▥◆▦▦◆▥', '◆▦▦▦▦◆', '▥◆▦▦◆▥', '▥▥◆◆▥▥')
            );
    });

    it('image with one color border', async () => {
        const imgSrc = await Jimp.read(
            mkJGD(
                '▥▥▥▥▥▥▥▥▥▥▥▥',
                '▥▥▥▥▥▥▥▥▥▥▥▥',
                '▥▥   ◆◆   ▥▥',
                '▥▥  ◆▦▦◆  ▥▥',
                '▥▥ ◆▦▦▦▦◆ ▥▥',
                '▥▥  ◆▦▦◆  ▥▥',
                '▥▥   ◆◆   ▥▥',
                '▥▥▥▥▥▥▥▥▥▥▥▥',
                '▥▥▥▥▥▥▥▥▥▥▥▥'
            )
        );

        imgSrc
            .autocrop()
            .getJGDSync()
            .should.be.sameJGD(
                mkJGD(
                    '   ◆◆   ',
                    '  ◆▦▦◆  ',
                    ' ◆▦▦▦▦◆ ',
                    '  ◆▦▦◆  ',
                    '   ◆◆   '
                )
            );
    });

    it('image border with small variation', async () => {
        const imgSrc = await Jimp.read(
            mkJGD(
                '323232323232',
                '232323232323',
                '32   ◆◆   32',
                '23  ◆▦▦◆  23',
                '32 ◆▦▦▦▦◆ 32',
                '23  ◆▦▦◆  23',
                '32   ◆◆   32',
                '232323232323',
                '323232323232'
            )
        );
        imgSrc
            .clone()
            .autocrop()
            .getJGDSync()
            .should.be.sameJGD(
                mkJGD(
                    '323232323232',
                    '232323232323',
                    '32   ◆◆   32',
                    '23  ◆▦▦◆  23',
                    '32 ◆▦▦▦▦◆ 32',
                    '23  ◆▦▦◆  23',
                    '32   ◆◆   32',
                    '232323232323',
                    '323232323232'
                )
            );
        imgSrc
            .clone()
            .autocrop(0.005)
            .getJGDSync()
            .should.be.sameJGD(
                mkJGD(
                    '   ◆◆   ',
                    '  ◆▦▦◆  ',
                    ' ◆▦▦▦▦◆ ',
                    '  ◆▦▦◆  ',
                    '   ◆◆   '
                )
            );
    });
});
