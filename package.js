import './generated/io/package'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {deepKeyAssigner} from '@flexio-oss/js-generator-helpers'
import {StyleSheetMediaArrayBuilder} from './src/js/types/StyleSheetMediaArray'
import {Style} from './src/js/types/Style'
import {Stylist, StylistBuilder} from './src/js/Stylist'
import {CssLikeBuilder} from './src/js/CssLikeBuilder'

/**
 * @property {StyleSheetMediaArrayBuilder} globalFlexioImport.io.flexio.stylist.types.StyleSheetMediaArrayBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.stylist.types.StyleSheetMediaArrayBuilder', StyleSheetMediaArrayBuilder)

/**
 * @property {Style} globalFlexioImport.io.flexio.stylist.types.Style
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.stylist.types.Style', Style)

/**
 * @property {Stylist} globalFlexioImport.io.flexio.stylist.Stylist
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.stylist.Stylist', Stylist)
/**
 * @property {StylistBuilder} globalFlexioImport.io.flexio.stylist.StylistBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.stylist.StylistBuilder', StylistBuilder)

/**
 * @property {CssLikeBuilder} globalFlexioImport.io.flexio.stylist.CssLikeBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.stylist.CssLikeBuilder', CssLikeBuilder)

