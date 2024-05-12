<script>
import { mapGetters } from 'vuex'
export default {
props: {
  coordinates: Array,
  mapZoom: Number,
  isPartical: Boolean
},
  data () {
    return { 
      zoom: this.mapZoom,
      center: this.coordinates,
      rotation: 0,
    }
  },
  computed: {
  ...mapGetters(["getItem", "getIsWholeMap", "itemsGetter", "cartGetter"]),
}
}
</script>

<template>
          <div>
              <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
                       data-projection="EPSG:4326" :class="{'w-80 h-80': !getIsWholeMap, 'map': getIsWholeMap}">
                <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

                <vl-layer-tile id="osm">
                    <vl-source-osm></vl-source-osm>
                </vl-layer-tile>


                  <div v-if="!getIsWholeMap">
                    <vl-feature>
                        <vl-geom-point :coordinates="coordinates"></vl-geom-point>
                    </vl-feature>

                    <vl-overlay :position="coordinates">
                    <div class="bg-white opacity-80 text-sm">
                    {{getItem.title}}<br>
                    </div>
                  </vl-overlay>
                </div>


                <div v-else>
                    <div v-if="!isPartical">
                  <vl-feature v-for="item in itemsGetter" :key="item.id">
                        <vl-geom-point  :coordinates="item.coords"></vl-geom-point>
                  </vl-feature>

                    <vl-overlay v-for="item in itemsGetter" :key="item.title" :position="item.coords">
                    <div class="bg-white opacity-80 text-sm">
                    {{item.title}}<br>
                    </div>
                  </vl-overlay>
                </div>

                <div v-else>
                  <vl-feature v-for="item in cartGetter" :key="item.id">
                        <vl-geom-point  :coordinates="item.coords"></vl-geom-point>
                  </vl-feature>

                    <vl-overlay v-for="item in cartGetter" :key="item.title" :position="item.coords">
                    <div class="bg-white opacity-80 text-sm">
                    {{item.title}}<br>
                    </div>
                  </vl-overlay>
                </div>
                </div>


              </vl-map>
          </div>
  </template>

  <style>
.map {
  width: 500px;
  height: 500px;
}
  </style>