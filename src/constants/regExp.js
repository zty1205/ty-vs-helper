const VUEX_WORDS = [/mapState\((.+)\)/, /mapMutations\((.+)\)/, /mapActions\((.+)\)/, /mapGetters\((.+)\)/];

const MAP_STORE_SHORT_REG = /('(.+)',)?\s*\[.+\]/;

module.exports = {
  VUEX_WORDS,
  MAP_STORE_SHORT_REG
};
