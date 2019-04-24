import Validator from "validator";
import isEmpty from "lodash/isEmpty";
import {map} from "lodash";
import {toCapitalizedWords} from "../helper/helperFunctions";

/*
inputs = {
    first_name: 'first name',
    email: 'email@exampl.com',
    password: 'password',
    confirm_password: 'confirm_password'
}
rules = {
    first_name: 'required',
    confirm_password: 'match:password'
 */
export function validateFields(inputs, rules) {
    let errors = {};
    // loop through each rules
    map(rules, (rule, ruleKey) => {
        if (inputs[ruleKey]) {
            let ruleTypes = rule.split('|');
            map(ruleTypes, (ruleType, key) => {
                if (!errors[ruleKey] && validate(ruleType, ruleKey, inputs[ruleKey], inputs)) {
                    errors[ruleKey] = validate(ruleType, ruleKey, inputs[ruleKey], inputs);
                }
            })
        } else {
            errors[ruleKey] = toCapitalizedWords(ruleKey) + ' is required';
        }

    });

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export function validate(rule, fieldName, field, inputs) {
    if (typeof field === 'undefined') {
        field = '';
    }
    let extractedRule = rule.split(':')[0];
    switch (extractedRule) {
        case 'required':
            if (!field) {
                return toCapitalizedWords(fieldName) + ' is required';
            }
            break;
        case 'min':
            let minAllowedLength = rule.split(':')[1];
            if (field.length < minAllowedLength) {
                return toCapitalizedWords(fieldName) + ' should have length of min ' + minAllowedLength + ' chars';
            }
            break;
        case 'email':
            if (!Validator.isEmail(field)) {
                return toCapitalizedWords(fieldName) + ' is invalid';
            }
            break;
        case 'website':
            if (!(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(field))) {
                return toCapitalizedWords(fieldName) + ' is invalid';
            }
            break;
        case 'phone_number':
            if (!(/^\(?(\d{2})\)?[- ]?(\d{4})[- ]?(\d{4})$/.test(field))) {
                return toCapitalizedWords(fieldName) + ' is invalid';
            }
            break;
        case 'abn':
            if (! (/^\(?(\d{4})\)?[- ]?(\d{4})[- ]?(\d{4})$/.test(field)) ) {
                return toCapitalizedWords(fieldName) + ' is invalid';
            }
            break;
        case 'captcha':
            if (!field) {
                return 'Please verify that you are human';
            }
            break;
        case 'lowercase':
            if (!/[a-z]/.test(field)) {
                return toCapitalizedWords(fieldName) + ' should have at least one Lowercase';
            }
            break;
        case 'uppercase':
            if (!/[A-Z]/.test(field)) {
                return toCapitalizedWords(fieldName) + ' should have at least one Uppercase';
            }
            break;
        case 'numeric':
            if (! /^\d+$/.test(field)) {
                return toCapitalizedWords(fieldName) + ' should be Numeric';
            }
            break;
        case 'num':
            if (!/[0-9]/.test(field)) {
                return toCapitalizedWords(fieldName) + ' should have at least one Number';
            }
            break;
        case 'specialChar':
            if (!/[!@#\$%\^\&*\)\(+=._-]/.test(field)) {
                return toCapitalizedWords(fieldName) + ' should have at least one Special char';
            }
            break;
        case 'match':
            let matchField = rule.split(':')[1];
            if (field !== inputs[matchField]) {
                return toCapitalizedWords(matchField) + ' and ' + toCapitalizedWords(fieldName) + ' should match';
            }
            break;
        case 'max':
            let maxAllowedLength = rule.split(':')[1];
            if (field.length > maxAllowedLength) {
                return toCapitalizedWords(fieldName) + ' should have length of max ' + maxAllowedLength + ' chars';
            }
            break;
        default:
    }
}