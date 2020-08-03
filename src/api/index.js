import * as Account from './accountController'
import * as homeInformation from './homeInformation'
import * as writeArticle from  './writeArticle'
import * as followController from './followController'
import * as answerController from './answerController'
import * as articleDetail from './articleDetail'
import {extend} from '../util';
export default extend({},
    Account,
    homeInformation,
    writeArticle,
    followController,
    answerController,
    articleDetail
);


