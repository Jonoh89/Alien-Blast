# Alien Blast

Designed for mobile.

## Folders

### public 

Contains the items that are used as-is for development and production. Images and sounds have already been spirited and 
are loaded in via Phaser's loader.

### src

Contains all the JavaScript that will be bundled along with sass, fonts and images that will be loaded using webpack.
Everything other than the `images/game` folder and `sounds` folder will be bundled using webpack. These two folders
contain the raw resources before the image/sound spiriting process documented below.

### test

Contains the unit tests for the project.



## Run

```
npm start
```

## Mobile

Modify the package.json to set the host to the IP address for your computer

```
npm run startMobile
```

## ESlint

```
npm run eslint
```

## Test

```
npm test
```

## Build Production

```
npm run build
```

## Translations

Translations are kept under /src/images and are required in using webpack. The I18n translation framework will use
the browsers language if available otherwise default to `en` (the queen's english).

## Sprite Sounds

Must install ffmpeg:
```
brew install ffmpeg --with-theora --with-libogg --with-libvorbis
```

*Requires manual step* Must set background to loop in the sprite.json file the audiosprite task produces

```
npm run audiosprite
```

## Sprite Images

* Requires Texture packer. Open
 

