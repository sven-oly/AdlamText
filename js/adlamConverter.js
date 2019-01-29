
// Create combined map
private_use_map_combined = {};

function combineMaps() {
  var key_arab = adlam_convert_unicode_map;
  for (k in key_arab) {
    private_use_map_combined[k] = [adlam_convert_unicode_map[k], ''];
  }

  for (k in adlam_Latin_to_unicode_map) {
    if (private_use_map_combined[k]) {
      private_use_map_combined[k] = [adlam_convert_unicode_map[k], adlam_Latin_to_unicode_map[k]];
    } else {
       private_use_map_combined[k] = ['', adlam_Latin_to_unicode_map[k]];
   }
  }
}

function convertOtherToUnicode(textIn, toLower, sentenceCaseFlag) {

}

function convertLatinToUnicode(textIn, toLower) {
}

combineMaps();