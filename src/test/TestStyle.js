import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {styleSheetMediaAll, styleSheetMediaPrint} from './TestStyleSheetMedia'

/**
 * @extends {Style}
 */
export class ColorStyle extends globalFlexioImport.io.flexio.stylist.types.Style {

   colorAlert() {
    return this._css('.color-main')
      .rule(
        styleSheetMediaAll,
        {
          'color': 'red',
          'background-color': 'black',
        }
      ).rule(
        styleSheetMediaPrint,
        {
          'color': 'red'
        }
      )
      .build()
  }

   colorInfo() {
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

/**
 * @extends {Style}
 */
export class BadStyle extends globalFlexioImport.io.flexio.stylist.types.Style {
  constructor() {
    super()
  }


   colorAlert() {
    return this._css('.color-main')
      .rule(
        styleSheetMediaAll,
        {
          'color': 'red',
          'background-color': 'black',
        }
      ).rule(
        styleSheetMediaPrint,
        {
          'color': 'red'
        }
      )
      .build()
  }

   colorInfo() {
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

/**
 * @extends {Style}
 */
export class BadSelectorStyle extends globalFlexioImport.io.flexio.stylist.types.Style {


   colorAlert() {
    return this._css('.color-main, div')
      .rule(
        styleSheetMediaAll,
        {
          'color': 'red',
          'background-color': 'black',
        }
      ).rule(
        styleSheetMediaPrint,
        {
          'color': 'red'
        }
      )
      .build()
  }


}
