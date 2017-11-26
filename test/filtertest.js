const assert  = require('assert');
describe('filterTEst', function() {
    const array = [
        {
            "_id": "5a19482ce3267b291bed9d37",
            "Contents": "권한테스트 비공개데이터",
            "PostedBy": {
                "_id": "5a0da87739848b22317c918a",
                "Nick": "김지운",
                "App": "kakao",
                "AppId": "1234567",
                "Profile": "post_1510844531521스크린샷 2017-11-15 오후 7.32.42.png",
                "AccessToken": "$2a$08$o6D0GM1T3m6Ajb57eWK3D.p/T47Xygnoz.zvQ427zKFu5p2XFchgm",
                "DecryptValue": "g41aeqax",
                "__v": 0,
                "CreatedAt": "2017-11-25T15:50:59.125Z",
                "Upload_Article": [],
                "Agree_Wait_Friends": [
                    "5a0ea7e2d6aebb2a8ae0d9a6"
                ],
                "Friends": [
                    "5a0ea6038e0a2d2a080886f9"
                ]
            },
            "__v": 0,
            "UpdatedAt": "2017-11-25T10:38:36.294Z",
            "CreatedAt": "2017-11-25T10:38:36.294Z",
            "Comments": [],
            "Article_List": [
                {
                    "_id": "5a19482ce3267b291bed9d35",
                    "Title": "kim",
                    "Place": "용당 동아아파트104동",
                    "PlaceType": "요식업",
                    "Loc": [
                        127.1231312,
                        34.324224
                    ],
                    "PostedBy": "5a0da87739848b22317c918a",
                    "__v": 0,
                    "UpdatedAt": "2017-11-25T10:38:36.085Z",
                    "CreatedAt": "2017-11-25T10:38:36.085Z"
                },
                {
                    "_id": "5a19482ce3267b291bed9d36",
                    "Title": "lee",
                    "Place": "Naver",
                    "PlaceType": "집",
                    "PostedBy": "5a0da87739848b22317c918a",
                    "__v": 0,
                    "UpdatedAt": "2017-11-25T10:38:36.087Z",
                    "CreatedAt": "2017-11-25T10:38:36.087Z"
                }
            ],
            "Publish_range": 2,
            "Images": [
                "article_1511606312384_스크린샷 2017-10-27 오후 3.31.04.png"
            ],
            "Like": 0
        },
        {
            "_id": "5a17e89406afe3274335381a",
            "Kml_Uri": "",
            "Contents": "오늘도 친구들만 보자!!!!!!!!!",
            "PostedBy": {
                "_id": "5a0ea7e2d6aebb2a8ae0d9a6",
                "Nick": "최석찬",
                "App": "kakao",
                "AppId": "24323232",
                "Profile": "post_1510909918662스크린샷 2017-10-27 오후 3.25.19.png",
                "AccessToken": "$2a$08$56gl232AwLtcL2fDssKdxeZjDiM3SaKFv0/hHWP3XNBOQLml7Ke/u",
                "DecryptValue": "9us1crpz",
                "__v": 0,
                "CreatedAt": "2017-11-25T15:50:59.125Z",
                "Upload_Article": [],
                "Agree_Wait_Friends": [],
                "Friends": []
            },
            "__v": 0,
            "UpdatedAt": "2017-11-24T09:38:28.129Z",
            "CreatedAt": "2017-11-24T09:38:28.129Z",
            "Comments": [],
            "Article_List": [
                {
                    "_id": "5a17e89306afe32743353818",
                    "Title": "kim",
                    "Place": "용당 동아아파트104동",
                    "PlaceType": "요식업",
                    "Loc": [
                        127.1231312,
                        34.324224
                    ],
                    "PostedBy": "5a0ea7e2d6aebb2a8ae0d9a6",
                    "__v": 0,
                    "UpdatedAt": "2017-11-24T09:38:27.911Z",
                    "CreatedAt": "2017-11-24T09:38:27.911Z"
                },
                {
                    "_id": "5a17e89306afe32743353819",
                    "Title": "lee",
                    "Place": "Naver",
                    "PlaceType": "서비스업",
                    "Loc": [
                        126.1231312,
                        35.324224
                    ],
                    "PostedBy": "5a0ea7e2d6aebb2a8ae0d9a6",
                    "__v": 0,
                    "UpdatedAt": "2017-11-24T09:38:27.912Z",
                    "CreatedAt": "2017-11-24T09:38:27.912Z"
                }
            ],
            "Publish_range": 1,
            "Images": [],
            "Like": 0
        },
        {
            "_id": "5a17e86c06afe32743353816",
            "Kml_Uri": "",
            "Contents": "오늘도 친구들만 보자!",
            "PostedBy": {
                "_id": "5a0ea7e2d6aebb2a8ae0d9a6",
                "Nick": "최석찬",
                "App": "kakao",
                "AppId": "24323232",
                "Profile": "post_1510909918662스크린샷 2017-10-27 오후 3.25.19.png",
                "AccessToken": "$2a$08$56gl232AwLtcL2fDssKdxeZjDiM3SaKFv0/hHWP3XNBOQLml7Ke/u",
                "DecryptValue": "9us1crpz",
                "__v": 0,
                "CreatedAt": "2017-11-25T15:50:59.125Z",
                "Upload_Article": [],
                "Agree_Wait_Friends": [],
                "Friends": []
            },
            "__v": 0,
            "UpdatedAt": "2017-11-24T09:37:48.948Z",
            "CreatedAt": "2017-11-24T09:37:48.948Z",
            "Comments": [],
            "Article_List": [
                {
                    "_id": "5a17e86c06afe32743353814",
                    "Title": "kim",
                    "Place": "용당 동아아파트104동",
                    "PlaceType": "요식업",
                    "Loc": [
                        127.1231312,
                        34.324224
                    ],
                    "PostedBy": "5a0ea7e2d6aebb2a8ae0d9a6",
                    "__v": 0,
                    "UpdatedAt": "2017-11-24T09:37:48.222Z",
                    "CreatedAt": "2017-11-24T09:37:48.222Z"
                },
                {
                    "_id": "5a17e86c06afe32743353815",
                    "Title": "lee",
                    "Place": "Naver",
                    "PlaceType": "서비스업",
                    "PostedBy": "5a0ea7e2d6aebb2a8ae0d9a6",
                    "__v": 0,
                    "UpdatedAt": "2017-11-24T09:37:48.224Z",
                    "CreatedAt": "2017-11-24T09:37:48.224Z"
                }
            ],
            "Publish_range": 1,
            "Images": [],
            "Like": 0
        },
        {
            "_id": "5a17e73e287b52008d9f10b0",
            "Contents": "오늘도 즐거운 하루 잘해보자!",
            "PostedBy": {
                "_id": "5a0ea7e2d6aebb2a8ae0d9a6",
                "Nick": "최석찬",
                "App": "kakao",
                "AppId": "24323232",
                "Profile": "post_1510909918662스크린샷 2017-10-27 오후 3.25.19.png",
                "AccessToken": "$2a$08$56gl232AwLtcL2fDssKdxeZjDiM3SaKFv0/hHWP3XNBOQLml7Ke/u",
                "DecryptValue": "9us1crpz",
                "__v": 0,
                "CreatedAt": "2017-11-25T15:50:59.125Z",
                "Upload_Article": [],
                "Agree_Wait_Friends": [],
                "Friends": []
            },
            "__v": 0,
            "UpdatedAt": "2017-11-24T09:32:46.674Z",
            "CreatedAt": "2017-11-24T09:32:46.674Z",
            "Comments": [],
            "Article_List": [
                {
                    "_id": "5a17e73e287b52008d9f10ae",
                    "Title": "kim",
                    "Place": "용당 동아아파트104동",
                    "PlaceType": "요식업",
                    "Loc": [
                        127.1231312,
                        34.324224
                    ],
                    "PostedBy": "5a0ea7e2d6aebb2a8ae0d9a6",
                    "__v": 0,
                    "UpdatedAt": "2017-11-24T09:32:46.413Z",
                    "CreatedAt": "2017-11-24T09:32:46.412Z"
                },
                {
                    "_id": "5a17e73e287b52008d9f10af",
                    "Title": "lee",
                    "Place": "Naver",
                    "PlaceType": "서비스업",
                    "PostedBy": "5a0ea7e2d6aebb2a8ae0d9a6",
                    "__v": 0,
                    "UpdatedAt": "2017-11-24T09:32:46.416Z",
                    "CreatedAt": "2017-11-24T09:32:46.416Z"
                }
            ],
            "Publish_range": 0,
            "Images": [
                "article_1511515963923_스크린샷 2017-10-27 오후 3.25.19.png",
                "article_1511515963987_스크린샷 2017-11-03 오후 2.44.58.png"
            ],
            "Like": 0
        }
    ];
    before(function() {
        // excuted before test suite
    });

    after(function() {
        // excuted after test suite
    });

    beforeEach(function() {
        // excuted before every test
    });

    afterEach(function() {
        // excuted after every test
    });

    describe('filterTest1', function() {
        it('this is a test.', function() {
            // write test logic
            const expected_result = [
                {
                    "_id": "5a17e73e287b52008d9f10b0",
                    "Contents": "오늘도 즐거운 하루 잘해보자!",
                    "PostedBy": {
                        "_id": "5a0ea7e2d6aebb2a8ae0d9a6",
                        "Nick": "최석찬",
                        "App": "kakao",
                        "AppId": "24323232",
                        "Profile": "post_1510909918662스크린샷 2017-10-27 오후 3.25.19.png",
                        "AccessToken": "$2a$08$56gl232AwLtcL2fDssKdxeZjDiM3SaKFv0/hHWP3XNBOQLml7Ke/u",
                        "DecryptValue": "9us1crpz",
                        "__v": 0,
                        "CreatedAt": "2017-11-25T16:40:14.161Z",
                        "Upload_Article": [],
                        "Agree_Wait_Friends": [],
                        "Friends": []
                    },
                    "__v": 0,
                    "UpdatedAt": "2017-11-24T09:32:46.674Z",
                    "CreatedAt": "2017-11-24T09:32:46.674Z",
                    "Comments": [],
                    "Article_List": [
                        {
                            "_id": "5a17e73e287b52008d9f10ae",
                            "Title": "kim",
                            "Place": "용당 동아아파트104동",
                            "PlaceType": "요식업",
                            "Loc": [
                                127.1231312,
                                34.324224
                            ],
                            "PostedBy": "5a0ea7e2d6aebb2a8ae0d9a6",
                            "__v": 0,
                            "UpdatedAt": "2017-11-24T09:32:46.413Z",
                            "CreatedAt": "2017-11-24T09:32:46.412Z"
                        },
                        {
                            "_id": "5a17e73e287b52008d9f10af",
                            "Title": "lee",
                            "Place": "Naver",
                            "PlaceType": "서비스업",
                            "PostedBy": "5a0ea7e2d6aebb2a8ae0d9a6",
                            "__v": 0,
                            "UpdatedAt": "2017-11-24T09:32:46.416Z",
                            "CreatedAt": "2017-11-24T09:32:46.416Z"
                        }
                    ],
                    "Publish_range": 0,
                    "Images": [
                        "article_1511515963923_스크린샷 2017-10-27 오후 3.25.19.png",
                        "article_1511515963987_스크린샷 2017-11-03 오후 2.44.58.png"
                    ],
                    "Like": 0
                }
            ];
            array.slice().reverse().forEach(function(article,index,currentArray){
                console.log('CurrentArrayLength:'+currentArray.length);
                console.log('arrayLength:'+array.length);
                console.log('index:'+index);
                console.log('SpliceIndex:'+((currentArray.length-1)-index));
                console.log('\n\n');
                if(article.Publish_range === 1){
                    if(!(article.PostedBy.Friends.indexOf("5a19482ce3267b291bed9d35")>-1)){
                        console.log(array.splice(((currentArray.length-1)-index),1));
                    }
                }else if(article.Publish_range === 2){
                    if(article.PostedBy._id !== '5a19482ce3267b291bed9d35'){
                        console.log(article.PostedBy._id+':'+'5a19482ce3267b291bed9d35');
                        console.log(array.splice(((currentArray.length-1)-index),1));
                    }
                }

            });
            console.log('Array');
            console.log(array);
            assert.equal(array,expected_result,'Filter is Invalid because');
        });
    });
});
