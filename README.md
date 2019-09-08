# stylist
Another way to try to delete css

## Stylist
Create DOM stylesheets for every ordered media, and register styles.

```javascript
import {StylistBuilder} from '@flexio-oss/stylist'
// or globalFlexioImport.io.flexio.stylist.types.StylistBuilder
/**
*
* @type {Stylist}
*/
const stylist = new StylistBuilder()
    .logger(myLogger)
    .addStyleSheetMedia(styleSheetMediaMobile)
    .addStyleSheetMedia(styleSheetMediaDesktop)
    .addStyleSheetMedia(styleSheetMediaPrint)
    .build()

/**
*
* @type {ColorStyle}
*/
const myColorStyle = stylist.register(new ColorStyle())
/**
*
* @type {BorderStyle}
*/
const myBorderStyle = stylist.register(new BorderStyle())
```

## StyleSheetMedia
 ```javascript
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

/**
*
* @type {StyleSheetMedia}
*/
const styleSheetMediaPrint = new globalFlexioImport.io.flexio.stylist.types.StyleSheetMediaBuilder()
  .name('print')
  .medias(
    new globalFlexioImport.io.flexio.extended_flex_types.StringArrayBuilder()
      .pushValue('print')
      .build()
  )
  .build()
```

## Style

```javascript
import {Style} from '@flexio-oss/stylist'
// or globalFlexioImport.io.flexio.stylist.types.Style

class ColorStyle extends Style {

  get colorAlert() {
    return this._css('.color-main')
      .rule(
        styleSheetMediaAll,
        {
          'color': 'red',
          'background-color': 'black',
        }
      )
      .rule(
        styleSheetMediaPrint,
        {
          'color': 'red'
        }
      )
      .build()
  }

  get colorInfo() {
    return this._css('.color-info')
      .rule(
        styleSheetMediaAll,
        {
          'color': 'blue',
          'background-color': '#c1efdb',
        }
      )
      .rule(
        styleSheetMediaPrint,
        {
          'color': 'blue'
        }
      )
      .build()
  }
}
```
