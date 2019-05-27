export const version :string;
export function toStringLiteral (string :string) :string;
export function isIdentifier (id :string, notESM? :boolean) :boolean;
export function isBareKey (key :string, notES3? :boolean) :boolean;
export default exports;
declare const exports :{
	version :typeof version
	toStringLiteral :typeof toStringLiteral
	isIdentifier :typeof isIdentifier
	isBareKey :typeof isBareKey
	default :typeof exports
};