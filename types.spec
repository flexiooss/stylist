StyleSheetMedia:
  name: string
  medias:
    $list: string

StyleRules:
  selectors:
    $list: string
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
