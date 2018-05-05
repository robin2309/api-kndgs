import {defaultsDeep} from 'lodash'
import production from './production';
import staging from './staging';
import development from './development';

const configs = {
	production,
	development,
	staging
};

export const getConfigs = () => {
	return process.env.NODE_ENV 
		? defaultsDeep(configs[process.env.NODE_ENV], production)
		: production;
}
