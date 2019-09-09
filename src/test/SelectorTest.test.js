/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {Selector} from '../js/types/Selector'
import {SelectorException} from '../js/types/SelectorException'

const assert = require('assert')

export class SelectorTest extends TestCase {
  testValidate() {
    const selector = new Selector('.bibi').validate()

    assert.throws(() => {
        const badSelector = new Selector('.bibi, div').validate()

      },
      SelectorException
    )
  }
}

runTest(SelectorTest)
