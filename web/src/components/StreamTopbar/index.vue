<<template>
   <div class="streamTopbar">
      <svg
        @click="$router.go(-1)"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        version="1.1"
        viewBox="0 0 20 20"
        x="0px"
        y="0px"
        class="ScIconSVG-sc-1bgeryd-1 eOJUoR"
      >
        <g fill="#0E0E10">
          <path d="M5 2a2 2 0 00-2 2v8a2 2 0 002 2V4h8a2 2 0 00-2-2H5z" fill="#0E0E10"></path>
          <path
            fill-rule="evenodd"
            d="M7 8a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H9a2 2 0 01-2-2V8zm2 0h6v8H9V8z"
            clip-rule="evenodd"
            fill="#0E0E10"
          ></path>
        </g>
      </svg>
    </div>
</template>

<script>
export default {
  name: 'StreamTopbar'
}
</script>

<style lang="scss" scoped>
.streamTopbar {
  width: 100%;
  height: 50px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  padding: 0 10px;
  position: relative;
  box-shadow: rgba(0 0 0 /5%) 0px 4px 8px, rgba(0 0 0 /20%) 0px 4px 8px;
}
</style>