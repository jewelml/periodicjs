'use strict';
/*jshint expr: true*/
const path = require('path');
const chai = require('chai');
const expect = require('chai').expect;
const routing = require('../../../lib/utilities/routing');
chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

describe('Periodic Util routing', function() {
    this.timeout(10000);
    describe('route_prefix', () => {
        it('should return the adminPath prefixed with "/" if "/" does not already exist', () => {
            expect(routing.route_prefix('r-admin')).to.eql('/r-admin');
        });

        it('should return the adminPath if "/" already exists', () => {
            expect(routing.route_prefix('/r-admin')).to.eql('/r-admin');
        });
    });

    describe('admin_prefix', () => {
        it('should return the adminPath without prefix', () => {
            expect(routing.admin_prefix('/r-admin')).to.eql('r-admin');
        });
    });

    describe('manifest_prefix', () => {
        it('should return a route string that has a preceding "/" and a "/" as suffix', () => {
            expect(routing.manifest_prefix('/r-admin')).to.eql('/r-admin/');
        });
    });

    describe('all_prefixes', () => {
        it('should return an object with all prefix types', () => {
            // expect(routing.all_prefixes('/r-admin')).to.be.an('object').that.have.keys('route_prefix', 'admin_prefix', 'manifest_prefix');
            expect(routing.all_prefixes('/r-admin')).to.deep.equal({
                'route_prefix': '/r-admin',
                'admin_prefix': 'r-admin',
                'manifest_prefix': '/r-admin/'
            });
        });
    });

    describe('splitModelNameReducer', () => {
        it('should return an updated object with key value pair of parent and array of children, given an object and a modelname', () => {
            expect(routing.splitModelNameReducer({}, 'standard_user_group')).to.deep.equal({
                'standard': ['user_group'],
            });
        });
    });

    describe('regexModelNameReducer', () => {
        it('should use regex to return an updated object with key value pair of parent and array of children, given an object and a modelname', () => {
            expect(routing.regexModelNameReducer({}, 'standard_user_group')).to.deep.equal({
                'standard': ['user_group'],
            });
        });
    });

});