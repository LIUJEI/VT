var rule = {
    title:'腾云驾雾',
    host:'https://v.%71%71.com',
    homeUrl:'/x/bu/pagesheet/list?_all=1&append=1&channel=choice&listpage=1&offset=0&pagesize=20',
    detailUrl:'https://node.video.%71%71.com/x/api/float_vinfo2?cid=fyid',
    searchUrl:'/x/search/?q=**&stag=fypage',
    searchable:2,
    filterable:1,
    multi:1,
    url:'/x/bu/pagesheet/list?_all=1&append=1&channel=fyclass&listpage=1&offset=((fypage-1)*20)&pagesize=20',
    headers:{
        'User-Agent':'PC_UA'
    },
    timeout:5000,
    cate_exclude:'会员|游戏|全部',
    class_name:'琉芸💜电影&电视剧&综艺&动漫&少儿&纪录片',
    class_url:'movie&tv&variety&cartoon&child&doco',
    limit:20,
    play_parse: true, 
    lazy:`js:
		let parseurl = 'http://119.91.31.224:9003/txqq.php?url=';
		let response = JSON.parse(request(parseurl + input));
		if (response.code == 200){
				input = {
					jx: 0,
					parse: 0,
					url: response.url
				}
		}
	  `,
    
    推荐:'.list_item;img&&alt;img&&src;a&&Text;a&&data-float',
    一级:'.list_item;img&&alt;img&&src;a&&Text;a&&data-float',
    二级:'js:VOD={};let d=[];let video_list=[];let video_lists=[];let list=[];let QZOutputJson;let html=fetch(input,fetch_params);let sourceId=/get_playsource/.test(input)?input.match(/id=(\\d*?)&/)[1]:input.split("cid=")[1];let cid=sourceId;let detailUrl="https://v.%71%71.com/detail/m/"+cid+".html";log("详情页:"+detailUrl);var pdfh=jsp.pdfh;var pd=jsp.pd;try{let json=JSON.parse(html);VOD={vod_url:input,vod_name:json.c.title,type_name:json.typ.join(","),vod_actor:json.nam.join(","),vod_year:json.c.year,vod_content:json.c.description,vod_remarks:json.rec,vod_pic:urljoin2(input,json.c.pic)}}catch(e){log("解析片名海报等基础信息发生错误:"+e.message)}if(/get_playsource/.test(input)){eval(html);let indexList=QZOutputJson.PlaylistItem.indexList;indexList.forEach(function(it){let dataUrl="https://s.video.qq.com/get_playsource?id="+sourceId+"&plat=2&type=4&data_type=3&range="+it+"&video_type=10&plname=qq&otype=json";eval(fetch(dataUrl,fetch_params));let vdata=QZOutputJson.PlaylistItem.videoPlayList;vdata.forEach(function(item){d.push({title:item.title,pic_url:item.pic,desc:item.episode_number+"\\t\\t\\t播放量："+item.thirdLine,url:item.playUrl})});video_lists=video_lists.concat(vdata)})}else{let json=JSON.parse(html);video_lists=json.c.video_ids;let url="https://v.qq.com/x/cover/"+sourceId+".html";if(video_lists.length===1){let vid=video_lists[0];url="https://v.qq.com/x/cover/"+cid+"/"+vid+".html";d.push({title:"在线播放",url:url})}else if(video_lists.length>1){for(let i=0;i<video_lists.length;i+=30){video_list.push(video_lists.slice(i,i+30))}video_list.forEach(function(it,idex){let o_url="https://union.video.qq.com/fcgi-bin/data?otype=json&tid=682&appid=20001238&appkey=6c03bbe9658448a4&union_platform=1&idlist="+it.join(",");let o_html=fetch(o_url,fetch_params);eval(o_html);QZOutputJson.results.forEach(function(it1){it1=it1.fields;let url="https://v.qq.com/x/cover/"+cid+"/"+it1.vid+".html";d.push({title:it1.title,pic_url:it1.pic160x90.replace("/160",""),desc:it1.video_checkup_time,url:url,type:it1.category_map&&it1.category_map.length>1?it1.category_map[1]:""})})})}}let yg=d.filter(function(it){return it.type&&it.type!=="正片"});let zp=d.filter(function(it){return!(it.type&&it.type!=="正片")});VOD.vod_play_from=yg.length<1?"琉芸💜解析":"琉芸💜解析$$$预告及花絮";VOD.vod_play_url=yg.length<1?d.map(function(it){return it.title+"$"+it.url}).join("#"):[zp,yg].map(function(it){return it.map(function(its){return its.title+"$"+its.url}).join("#")}).join("$$$");',
    搜索:'js:let d=[];pdfa=jsp.pdfa;pdfh=jsp.pdfh;pd=jsp.pd;let html=request(input);let baseList=pdfa(html,"body&&.result_item_v");baseList.forEach(function(it){let longText=pdfh(it,".result_title&&Text");let shortText=pdfh(it,".sub&&Text");let fromTag=pdfh(it,".result_source&&Text");let score=pdfh(it,".result_score&&Text");let content=pdfh(it,".desc_text&&Text");let url=pdfh(it,".result_title&&a&&href");let img=pd(it,".figure_pic&&src");url="https://node.video.qq.com/x/api/float_vinfo2?cid="+url.match(/.*\\/(.*?)\\.html/)[1];log(shortText+"|"+url);if(fromTag.match(/腾讯/)){d.push({title:longText.split(shortText)[0],img:img,url:url,content:content,desc:"⭐"+longText.split(shortText)[1]+"-"+shortText+" "+score})}});setResult(d);',
}
