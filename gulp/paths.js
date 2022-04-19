// All default supported file extensions are declared here!
export const Extensions = Object.freeze({
  html: `html,htm`,
  scripts: `js,ts`,
  styles: `css,scss`,
  images: `jpeg,jpg,png`
});

// All default folders are declared here!
export const Folders = Object.freeze({
  dist: `./dist`,
  assets: {
    common: {
      scripts: `./src/assets/common/scripts`,
      styles: `./src/assets/common/styles`,
      images: `./src/assets/common/images`
    },
    desktop: {
      scripts: `./src/assets/desktop/scripts`,
      styles: `./src/assets/desktop/styles`
    },
    mobile: {
      scripts: `./src/assets/mobile/scripts`,
      styles: `./src/assets/mobile/styles`
    },
    responsive: {
      scripts: `./src/assets/responsive/scripts`,
      styles: `./src/assets/responsive/styles`
    }
  }
});

// All default globs are declared here!
export const Globs = Object.freeze({
  assets: {
    common: {
      build: {
        scripts: [`${Folders.assets.common.scripts}/*.{${Extensions.scripts}}`, `!./**/*.test.{${Extensions.scripts}}`],
        styles: [`${Folders.assets.common.styles}/*.{${Extensions.styles}}`],
        images: [`${Folders.assets.common.images}/*.{${Extensions.images}}`],
        scripts_modules: [`${Folders.assets.common.scripts}/**/*.{${Extensions.scripts}}`, `!${Folders.assets.common.scripts}/*.{${Extensions.scripts}}`, `!./**/*.test.{${Extensions.scripts}}`],
        styles_modules: [`${Folders.assets.common.styles}/**/*.{${Extensions.styles}}`, `!${Folders.assets.common.styles}/*.{${Extensions.styles}}`],
      },
      linters: {
        scripts: [`${Folders.assets.common.scripts}/*.{${Extensions.scripts}}`, `${Folders.assets.common.scripts}/**/*.{${Extensions.scripts}}`, `!./**/*.test.{${Extensions.scripts}}`],
        styles: [`${Folders.assets.common.styles}/*.{${Extensions.styles}}`, `${Folders.assets.common.styles}/**/*.{${Extensions.styles}}`]
      },
    },
    desktop: {
      build: {
        scripts: [`${Folders.assets.desktop.scripts}/*.{${Extensions.scripts}}`, `!./**/*.test.{${Extensions.scripts}}`],
        styles: [`${Folders.assets.desktop.styles}/*.{${Extensions.styles}}`],
        scripts_modules: [`${Folders.assets.desktop.scripts}/**/*.{${Extensions.scripts}}`, `!${Folders.assets.desktop.scripts}/*.{${Extensions.scripts}}`, `!./**/*.test.{${Extensions.scripts}}`],
        styles_modules: [`${Folders.assets.desktop.styles}/**/*.{${Extensions.styles}}`, `!${Folders.assets.desktop.styles}/*.{${Extensions.styles}}`],
      },
      linters: {
        scripts: [`${Folders.assets.desktop.scripts}/*.{${Extensions.scripts}}`, `${Folders.assets.desktop.scripts}/**/*.{${Extensions.scripts}}`, `!./**/*.test.{${Extensions.scripts}}`],
        styles: [`${Folders.assets.desktop.styles}/*.{${Extensions.styles}}`, `${Folders.assets.desktop.styles}/**/*.{${Extensions.styles}}`]
      }
    },
    mobile: {
      build: {
        scripts: [`${Folders.assets.mobile.scripts}/*.{${Extensions.scripts}}`, `!./**/*.test.{${Extensions.scripts}}`],
        styles: [`${Folders.assets.mobile.styles}/*.{${Extensions.styles}}`],
        scripts_modules: [`${Folders.assets.mobile.scripts}/**/*.{${Extensions.scripts}}`, `!${Folders.assets.mobile.scripts}/*.{${Extensions.scripts}}`, `!./**/*.test.{${Extensions.scripts}}`],
        styles_modules: [`${Folders.assets.mobile.styles}/**/*.{${Extensions.styles}}`, `!${Folders.assets.mobile.styles}/*.{${Extensions.styles}}`],
      },
      linters: {
        scripts: [`${Folders.assets.mobile.scripts}/*.{${Extensions.scripts}}`, `${Folders.assets.mobile.scripts}/**/*.{${Extensions.scripts}}`, `!./**/*.test.{${Extensions.scripts}}`],
        styles: [`${Folders.assets.mobile.styles}/*.{${Extensions.styles}}`, `${Folders.assets.mobile.styles}/**/*.{${Extensions.styles}}`]
      }
    },
    responsive: {
      build: {
        scripts: [`${Folders.assets.responsive.scripts}/*.{${Extensions.scripts}}`, `!./**/*.test.{${Extensions.scripts}}`],
        styles: [`${Folders.assets.responsive.styles}/*.{${Extensions.styles}}`],
        scripts_modules: [`${Folders.assets.responsive.scripts}/**/*.{${Extensions.scripts}}`, `!${Folders.assets.responsive.scripts}/*.{${Extensions.scripts}}`, `!./**/*.test.{${Extensions.scripts}}`],
        styles_modules: [`${Folders.assets.responsive.styles}/**/*.{${Extensions.styles}}`, `!${Folders.assets.responsive.styles}/*.{${Extensions.styles}}`],
      },
      linters: {
        scripts: [`${Folders.assets.responsive.scripts}/*.{${Extensions.scripts}}`, `${Folders.assets.responsive.scripts}/**/*.{${Extensions.scripts}}`, `!./**/*.test.{${Extensions.scripts}}`],
        styles: [`${Folders.assets.responsive.styles}/*.{${Extensions.styles}}`, `${Folders.assets.responsive.styles}/**/*.{${Extensions.styles}}`]
      }
    }
  },
  views: {
    html: [`./src/views/*.{${Extensions.html}}`, `./src/views/**/*.{${Extensions.html}}`]
  }
});