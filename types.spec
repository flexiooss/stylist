StyleSheetMedia:
  name: string
  medias:
    $value-object:
      io.flexio.extended_flex_types.StringArray

StyleRules:
  selectors:
    $value-object:
      io.flexio.flex_types.arrays.StringArray
  rules:
    $list:
      $value-object:
        io.flexio.stylist.types.MediaRules

MediaRules:
  media:
    $value-object:
      io.flexio.stylist.types.StyleSheetMedia
  rules:
    $list:
      $value-object:
        io.flexio.stylist.types.Rule

Rule:
  property: string
  value: string
