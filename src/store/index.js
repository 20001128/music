const audioInfo = {
	state: {
    audioElement:'',   //音频元素
		currentIndex: 0,  //当前歌曲索引
		musicList:[],   //初始化歌曲列表
		musicUrlId:'',   //当前歌曲id
		currentTime:0,  //当前播放时间
		musicDuration: 0,  // 音乐的播放时长
		playing: false,  // 是否正在播放
		playType:1,  //播放类型,1顺序播放2随机播放3单曲循环
		likeType:1,  //喜欢状态0已添加1未添加
		lyric:[],  //歌词
		lyricIndex: -1,  // 歌词信息 索引
		userInfo:[],   //登录状态 
	},
	getters: {
		getAudioElement: state => state.audioElement,
		getMusicList:state => state.musicList,
		getCurrentMusic:state => state.musicList[state.currentIndex],
		getCurrentIndex:state => state.currentIndex,
		getMusicUrlId:state => state.musicUrlId,
		getCurrentTime:state => state.currentTime,
		getMusicDuration:state => state.musicDuration,		// 获取音乐的播放时长
		getIsPlaying:state => state.playing,  // 获取音乐是否播放
		getPlayType:state => state.playType,  //获取播放类型
		getLikeType:state => state.likeType,
		getCurrentMusicLyric:state => state.lyric,
		getLyricIndex: state => state.lyricIndex,  // 获取音乐歌词当前播放的索引 
		getUserInfo:state => state.userInfo,  //获取用户登录状态
	},
	mutations: {
		setMusicList(state,obj){
			state.musicList = obj
		},
		setCurrentMusicIndex(state,params){
			state.currentIndex = params
		},
		setAudio(state,ele){
			state.audioElement = ele
		},
		setMusicUrlId(state,params){
			state.musicUrlId = params
		},
		setMusicTimeUpdate(state,params){
			state.currentTime = params
		},
		setMusicDuration(state,params){
			state.musicDuration = params
		},
    // play设置
		play (state) {
			state.playing = true
			state.audioElement.play()
		},
		// 暂停设置
		pause (state) {
			state.playing = false
			state.audioElement.pause()
		},
		//暂停播放
		togglePlay (state) {
			if (state.playing) {
				state.playing = false
				state.audioElement.pause()
			} else {
				state.playing = true
				state.audioElement.play()
			}
		},
		// 播放下一曲
		playNext (state) {
			let type = state.playType
			if(type == 1){
				state.currentIndex ++
				const length = state.musicList.length
				if (state.currentIndex >= length) {
					state.currentIndex = 0
				}
				state.musicUrlId = state.musicList[state.currentIndex].url.substring(9)
				state.playing = true
		  }
			if(type == 2){
				const length = state.musicList.length
				state.currentIndex = Math.floor(Math.random() * length)
				state.musicUrlId = state.musicList[state.currentIndex].url.substring(9)
				state.playing = true
			}
		},
		// 播放上一曲
		playPrev (state) {
		  let type = state.playType
			if(type == 1){
				state.currentIndex --
				const length = state.musicList.length
				if (state.currentIndex < 0) {
					state.currentIndex = length - 1
				}
				state.musicUrlId = state.musicList[state.currentIndex].url.substring(9)
				state.playing = true
			}
			if(type == 2){
				const length = state.musicList.length
				state.currentIndex = Math.floor(Math.random() * length)
				state.musicUrlId = state.musicList[state.currentIndex].url.substring(9)
				state.playing = true

			}
		},
		//播放状态
		playStatus(state){
			if(state.playType == 3){
				state.playType = 1
			}else{
				state.playType++
			}
		},
		//音乐播放结束时播放下一首
		endPlayStatus(state){
			let type = state.playType
			if(type == 1){
				state.currentIndex++
				if(state.currentIndex>state.musicList.length){
					state.currentIndex = 0
				}
				state.musicUrlId = state.musicList[state.currentIndex].url.substring(9)
				state.playing = true
			}
			if(type == 2){
				const length = state.musicList.length
				state.currentIndex = Math.floor(Math.random() * length)
				state.musicUrlId = state.musicList[state.currentIndex].url.substring(9)
				state.playing = true
			}
			if(type == 3){
				state.audioElement.currentTime = 0
				state.musicUrlId = state.musicList[state.currentIndex].url.substring(9)
				state.playing = true
			}
		},
		likeStatus(state,params){
			if(params.length){
				state.likeType = 0
			}else{
				state.likeType = 1
			}
		},
		//歌词
		setLyric(state,obj){
			state.lyric = obj
		},
		// 设置音乐歌词当前播放的索引
		setLyricIndex (state, params) {
			state.lyricIndex = params
		},
		setUserInfo(state,params){
			state.userInfo = params
		}
	}
}
export default audioInfo
