
// Create combined map
private_use_map_combined = {};

var latin_map = new_adlam_Latin_to_unicode_map;

function combineMaps() {
  var key_arab = adlam_convert_unicode_map;
  for (k in key_arab) {
    var stripped_key = k;
    if (k !== " ") {
      stripped_key = k.replace(/\s/g,'')
    }
    private_use_map_combined[stripped_key] = [adlam_convert_unicode_map[k], ''];
  }

  for (k in latin_map) {
    stripped_key = k;
    if (k !== " ") {
      stripped_key = k.replace(/\s/g,'')
    }
    if (private_use_map_combined[stripped_key]) {
      private_use_map_combined[stripped_key] =
	  [adlam_convert_unicode_map[k], latin_map[k]];
    } else {
      private_use_map_combined[stripped_key] =
	  ['', latin_map[k]];
   }
  }
}

function convertOtherToUnicode(textIn, toLower, sentenceCaseFlag) {

}

function convertLatinToUnicode(textIn, toLower) {
}

combineMaps();
