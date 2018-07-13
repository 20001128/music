<template>
      <div class="leftMain">
        <div class="content">
            <div class="leftContent">
                <p><img src="../../../assets/images/homeIndex/bgImg.jpg" /></p>
                <p v-if="loading">
                    <span>{{userName}}</span>
                    <span>{{text}}</span>             
                </p>
								<p v-if="!loading">
                    <span>登录/注册</span>
									</p>
            </div>
            <div class="rightContent">
                <img src="../../../assets/images/homeIndex/skin.png" />
            </div>
        </div>
				<div class="content_body">
           <ul>
              <li><span>启动问候声</span><span><img src="../../../assets/images/listen/to_right.png" /></span></li>
							<li><span>皮肤中心</span><span><img src="../../../assets/images/listen/to_right.png" /></span></li>
							<li><span>关于爽我音乐</span><span><img src="../../../assets/images/listen/to_right.png" /></span></li>
           </ul>
				</div>
      </div>
</template>

<script>
  export default {
    data() {
      return {
        userName:'芊玟',
        text:'烟火里的尘埃',
				load:'经典版',
				loading:false
      }
    },
		methods:{
			clickPopup(){

			}
		}
  }
</script>

<style lang="scss">
  .leftMain{
		display: flex;
		flex-direction: column;
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 20;
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
		background: #aaa;
		.fleg-img{
				position: fixed;
				height: 100%;
				width: 100%;
				top: 0;
				left: 0;
				bottom: 0;
				transition: all 0.5s;
				right: 0;
				z-index: -1;
				background-image: url('../../../assets/images/homeIndex/bgImg.jpg');
				filter: blur(35px);
				background-size: cover;
				background-position: center center;
		}
		.content{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: .3rem;
			margin: .3rem;
			color: white;
			box-shadow: 0 1px #c8bcbc;
			.leftContent{
				display: flex;
				align-items: center;
				p{
					margin: 0 !important;
					&:nth-child(1){
						img{
							width: 3rem;
							height: 3rem;
							border-radius: 100%;
						}
					}
					&:nth-child(2){
						margin-left: 0.3rem !important;
						text-align: left;
						display: flex;
						flex-direction: column;
					}
				}
			}
			.rightContent{
				img{
					width: 1.8rem;
					height: 1.8rem;
				}
			}
		}
		.content_body{
			ul{
				flex-direction: column;
				margin: 0;
				padding: 1rem;
				li{
					display: flex;
          justify-content: space-between;
					margin: .3rem 0;
					box-shadow: 0 1px #c8bcbc;
					img{
						width: 1.3rem;
						height: 1.3rem;
					}
					&:nth-child(2){
						margin-top: 1rem;
					}
				}
			}
		}
  }
</style>
