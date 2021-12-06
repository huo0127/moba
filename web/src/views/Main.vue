<template>
  <div>
    <div class="topbar bg-dark py-5 px-5 d-flex ai-center">
      <i class="riot_logo mr-5"></i>
      <i class="lol_logo"></i>
      <Slide right>
        <router-link to="/">
          <span>首頁</span>
        </router-link>
        <router-link to="/stream">
          <span>遊戲直播</span>
        </router-link>
      </Slide>
    </div>

    <router-view></router-view>

    <!-- footer -->
    <div class="footer">
      <div class="text-center bg-blue-2 text-grey-2 pt-3 pb-3">
        <h1 class="fs-xl">Take League With You</h1>
        <div class="ml-4 mr-4">
          Download the League app to stay connected to friends and the latest game and esports news.
        </div>
        <div class="footer-icon mt-3 mb-3 ai-center">
          <a href="https://apps.apple.com/us/app/league-of-legends-friends/id1077150310">
            <img
              src="https://www.leagueoflegends.com/static/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.2928664f.svg"
              alt=""
            />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.riotgames.mobile.leagueconnect&hl=en">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt=""
              style="weight: 120px; height: 40px"
            />
          </a>
        </div>
      </div>
      <div class="footer-1 bg-dark py-5 px-5 d-flex jc-center">
        <svg width="99" height="32" class="" viewBox="0 0 109 35">
          <title>riotLogo-mobile</title>
          <path
            d="M17.714 31.681l-1.576-4.09 15.219.79-.684 6.545-12.96-3.245zM21.36 0L.062 10.143l3.293 15.284H7.7l-.75-10.932.667-.21 2.612 11.142h4.513l-.167-13.317.667-.21 2.282 13.527h4.78L23.43 9.341l.667-.21 1.181 16.296h6.32l2.224-22.37L21.359 0zm84.102 31.125l-6.06-1.035.027-.8 5.799-.216-.148-1.527h-7.455l-.382 3.834 6.162 1.08.029.706-6.412.252-.158 1.527h8.974l-.376-3.82zm-57.895-.572l-.093 1.384 2.208.075-.029 1.404-4.618-.136.202-4.06 6.352-.15-.093-1.526h-8.204l-.735 7.4h9.346l-.24-4.463-4.096.072zm39.566 2.717l-.045-1.274 4.372-.052.041-1.391-4.464-.055-.045-1.291 5.883-.14.048-1.523h-7.934l-.237 7.4h8.319l-.058-1.528-5.88-.146zm-6.406 1.673l-.735-7.4h-2.111l-3.037 3.527-3.032-3.526H69.7l-.735 7.4h2.48l.238-4.799 3.161 3.271 3.165-3.271.237 4.798h2.481zM70.3.454h-4.965l-.453 22.877h5.998L70.3.454zm20.188.008h-15.48l-.602 22.868h17.183L90.488.462zm-4.801 17.892l-5.479.178-.183-13.457 5.729.175-.067 13.104zM109 5.459l-.552-5.005H93.194l.128 4.458 4.882.172.497 18.247h6.011L102.915 5.25l6.085.21zM55.624 23.331h6.515l-4.246-10.269 3.389-1.867L58.965.454H42.33l-.545 4.956 3.72-.126-1.795 18.047h5.822l.157-5.752 4.195-2.31 1.74 8.062zM50.033 5.132l4.785-.162.546 4.559-5.524 2.63.193-7.027zm12.908 29.811h2.513l-1.986-7.4h-5.896l-1.986 7.4h2.513l.388-1.867 4.079.052.375 1.815zm-4.15-3.336l.505-2.42 2.423-.11.507 2.43-3.434.1z"
            fill="#E6E6E6"
          ></path>
        </svg>
      </div>
      <div class="footer-2 bg-dark py-5 px-5">
        <ul class="icon-list d-flex">
          <li>
            <a href="https://www.youtube.com/user/riotgamesinc"
              ><svg
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
                class=""
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <title>youtube</title>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm5.47-16.231c.602.148 1.077.583 1.237 1.136C19 9.908 19 12 19 12s0 2.092-.293 3.095c-.16.553-.635.988-1.238 1.136C16.38 16.5 12 16.5 12 16.5s-4.378 0-5.47-.268c-.602-.149-1.077-.584-1.237-1.137C5 14.092 5 12 5 12s0-2.092.293-3.095c.16-.553.635-.988 1.237-1.136C7.622 7.5 12 7.5 12 7.5s4.378 0 5.47.269zM14.226 12l-3.659-1.9v3.8l3.66-1.9z"
                  fill="#7e7e7e"
                ></path></svg
            ></a>
          </li>
          <li>
            <a href="https://twitter.com/leagueoflegends">
              <svg
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
                class=""
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <title>twitter</title>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm5.575-13.903c0 3.67-2.89 7.903-8.172 7.903v-.002A8.336 8.336 0 015 16.752a5.89 5.89 0 004.251-1.151c-.6-.01-1.18-.203-1.662-.548a2.785 2.785 0 01-1.022-1.38c.43.08.875.063 1.297-.048a2.891 2.891 0 01-1.654-.964 2.722 2.722 0 01-.65-1.759v-.035c.4.215.847.334 1.304.347A2.78 2.78 0 015.66 9.531a2.7 2.7 0 01.314-2.024 8.11 8.11 0 002.641 2.06c1.02.5 2.137.786 3.28.842a2.695 2.695 0 01.181-1.777 2.82 2.82 0 011.262-1.303 2.96 2.96 0 011.821-.292 2.907 2.907 0 011.63.838 5.876 5.876 0 001.824-.674 2.805 2.805 0 01-1.263 1.537A5.886 5.886 0 0019 8.3a5.74 5.74 0 01-1.433 1.437c.008.12.008.239.008.36z"
                  fill="#7e7e7e"
                ></path>
              </svg>
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/leagueoflegends">
              <svg
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
                class=""
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <title>facebook</title>
                <path
                  d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12z"
                  fill="#7e7e7e"
                ></path>
              </svg>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/leagueoflegends/">
              <svg
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
                class=""
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <title>instagram</title>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm2.829-17.698c-.739-.034-.96-.04-2.829-.04-1.87 0-2.09.006-2.829.04-.682.031-1.053.145-1.3.241-.326.127-.56.278-.805.523a2.171 2.171 0 00-.523.805c-.096.247-.21.618-.24 1.3-.035.739-.042.96-.042 2.829 0 1.87.007 2.09.041 2.829.031.682.145 1.053.241 1.3.127.326.278.56.523.804.246.245.479.397.805.524.247.096.618.21 1.3.24.738.035.96.042 2.829.042 1.87 0 2.09-.008 2.829-.041.682-.031 1.053-.145 1.3-.241.326-.127.56-.278.804-.524.245-.245.397-.478.524-.805.096-.246.21-.617.24-1.3.035-.738.042-.959.042-2.828 0-1.87-.008-2.09-.041-2.829-.031-.682-.145-1.053-.241-1.3a2.164 2.164 0 00-.524-.805 2.172 2.172 0 00-.805-.523c-.246-.096-.617-.21-1.3-.24zm-5.715-1.26C9.86 5.008 10.099 5 12 5c1.901 0 2.14.008 2.886.042.745.034 1.254.153 1.7.325.46.18.85.419 1.24.808.389.389.628.78.807 1.24.173.445.291.954.325 1.699.035.746.043.985.043 2.886 0 1.901-.009 2.14-.043 2.886-.034.745-.152 1.254-.325 1.7a3.43 3.43 0 01-.807 1.24c-.39.389-.78.628-1.24.807-.445.173-.955.291-1.7.325-.746.034-.985.042-2.886.042-1.9 0-2.14-.008-2.886-.042-.745-.034-1.254-.152-1.7-.325a3.43 3.43 0 01-1.239-.808 3.428 3.428 0 01-.807-1.24c-.173-.445-.292-.954-.326-1.699C5.008 14.14 5 13.901 5 12c0-1.901.008-2.14.042-2.886.034-.745.153-1.254.326-1.7.178-.46.418-.85.807-1.239.389-.39.78-.628 1.24-.807.445-.173.954-.292 1.699-.326zM12 8.405a3.594 3.594 0 100 7.19 3.594 3.594 0 000-7.19zm0 5.928a2.333 2.333 0 110-4.666 2.333 2.333 0 010 4.666zm4.577-6.07a.84.84 0 11-1.68 0 .84.84 0 011.68 0z"
                  fill="#7e7e7e"
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'
export default {
  components: {
    Slide
  }
}
</script>

<style lang="scss">
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;

  .riot_logo {
    background: url('../assets/images/main/riot_logo.svg') no-repeat;

    width: 75px;
    height: 24px;
  }
  .lol_logo {
    background: url('../assets/images/main/lol_logo.svg') no-repeat 0 0;
    width: 85px;
    height: 32px;
  }

  // burger
  .bm-burger-button {
    position: fixed;
    width: 15px;
    height: 12px;
    left: 30px;
    top: 36px;
    cursor: pointer;
  }
  .bm-burger-bars {
    background-color: #f9f9f9;
  }
  .line-style {
    position: absolute;
    height: 20%;
    left: 0;
    right: 0;
  }
  .cross-style {
    position: absolute;
    top: 12px;
    right: 2px;
    cursor: pointer;
  }
  .bm-cross {
    background: #bdc3c7;
  }
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }
  .bm-menu {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1000; /* Stay on top */
    top: 0;
    left: 0;
    background-color: #212121; /* Black*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 84px; /* Place content 60px from the top */
    transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
  }

  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
  .bm-item-list {
    color: #b8b7ad;
    margin-left: 10%;
    font-size: 20px;
  }
  .bm-item-list > * {
    display: flex;
    text-decoration: none;
    padding: 0.7em;
  }
  .bm-item-list > * > span {
    margin-left: 10px;
    font-weight: 700;
    color: white;
  }
}
.footer-icon {
  img {
    display: inline-block;
    padding: 0 10px;
  }
}
.footer-1 {
  .riot_logo {
    background: url('../assets/images/main/riot_logo.svg') no-repeat;
    width: 75px;
    height: 24px;
  }
}
.footer-2 {
  .icon-list {
    list-style: none;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    li {
      margin-left: 20px;
      margin-right: 20px;
    }
  }
}
</style>
