import version from './version?text';

import {
	isReservedWord,
	
	isIdentifierName,
	isIdentifier,
	isArrayIndex,
	isIntegerIndex,
	isPropertyName,
	
	PropertyName,
	PropertyAccessor,
	PropertyAccessors,
} from './Name';

import {
	StringLiteral,
	NumericLiteral,
	BigIntLiteral,
	RegularExpressionLiteral,
} from './Literal';

import { ObjectLiteral } from './Object';
import { ArrayLiteral } from './Array';

import exportify from './exportify';

export {
	
	version,
	
	isReservedWord,
	
	isIdentifierName,
	isIdentifier,
	isArrayIndex,
	isIntegerIndex,
	isPropertyName,
	PropertyName,
	PropertyAccessor,
	PropertyAccessors,
	
	StringLiteral,
	NumericLiteral,
	BigIntLiteral,
	RegularExpressionLiteral,
	
	ObjectLiteral,
	ArrayLiteral,
	
	exportify,
	
};

import Default from '.default?=';
export default Default({
	
	version: version,
	
	isReservedWord: isReservedWord,
	
	isIdentifierName: isIdentifierName,
	isIdentifier: isIdentifier,
	isArrayIndex: isArrayIndex,
	isIntegerIndex: isIntegerIndex,
	isPropertyName: isPropertyName,
	PropertyName: PropertyName,
	PropertyAccessor: PropertyAccessor,
	PropertyAccessors: PropertyAccessors,
	
	StringLiteral: StringLiteral,
	NumericLiteral: NumericLiteral,
	BigIntLiteral: BigIntLiteral,
	RegularExpressionLiteral: RegularExpressionLiteral,
	
	ObjectLiteral: ObjectLiteral,
	ArrayLiteral: ArrayLiteral,
	
	exportify: exportify
	
});
