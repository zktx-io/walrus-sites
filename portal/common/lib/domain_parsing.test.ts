// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, test } from 'vitest'
import { getDomain, getSubdomainAndPath } from './domain_parsing'
import { DomainDetails } from './types'

const PORTAL_DOMAIN_NAME_LENGTH = 21

const getDomainTestCases: [string, string][] = [
    ['https://example.com', 'example.com'],
    ['https://suinsname.localhost:8080', 'localhost'],
    ['https://subname.suinsname.localhost:8080', 'localhost'],
    ['https://flatland.walrus.site/', 'walrus.site'],
    ['https://4snh0c0o7quicfzokqpsmuchtgitnukme1q680o1s1nfn325sr.walrus.site/',
        'walrus.site'],
    ['https://4snh0c0o7quicfzokqpsmuchtgitnukme1q680o1s1nfn325sr.portalname.co.uk/',
        'portalname.co.uk'],
    ['https://subname.suinsname.portalname.co.uk/', 'portalname.co.uk'],
    ['https://subsubname.subname.suinsname.portalname.co.uk/',
        'portalname.co.uk']
]

describe('getDomain', () => {
    getDomainTestCases.forEach(([input, expected]) => {
        test(`${input} -> ${expected}`, () => {
            const domain = getDomain(new URL(input))
                expect(domain).toEqual(expected)
        })
    })
})

const getDomainWithPortalNameLengthTestCases: [string, string][] = [
    ['https://sw-tnet.blocksite.net', 'sw-tnet.blocksite.net'],
    ['https://subname.sw-tnet.blocksite.net', 'sw-tnet.blocksite.net']
]

describe('getDomain with portal name length', () => {
    getDomainWithPortalNameLengthTestCases.forEach(([input, expected]) => {
        test(`${input} -> ${expected}`, () => {
            const domain = getDomain(new URL(input), PORTAL_DOMAIN_NAME_LENGTH)
                expect(domain).toEqual(expected)
        })
    })
})

const getSubdomainAndPathTestCases: [string, DomainDetails][] = [
    ['https://subname.name.walrus.site/', {subdomain: 'subname.name', path: '/index.html' }],
    ['https://name.walrus.site/', { subdomain: 'name', path: '/index.html' }],
    ['http://name.localhost:8080/', { subdomain: 'name', path: '/index.html' }],
    ['http://flatland.localhost:8080/', { subdomain: 'flatland', path: '/index.html' }],
    ['http://subname.suinsname.localhost:8080/',
        { subdomain: 'subname.suinsname', path: '/index.html' }],
    ['https://subsubname.subname.suinsname.portalname.co.uk/',
        { subdomain: 'subsubname.subname.suinsname', path: '/index.html' }],
    ['http://docs.localhost/css/print.css', { subdomain: 'docs', path: '/css/print.css' }],
    ['http://docs.localhost/assets/index-a242f32b.js',
        { subdomain: 'docs', path: '/assets/index-a242f32b.js'}],
    ['https://abc.blob.store/', { subdomain: 'abc', path: '/index.html' }],
    ['https://abc.blob.store', { subdomain: 'abc', path: '/index.html' }],
    ['https://stake.walrus.site/images/favicon.ico', { subdomain: 'stake', path: '/images/favicon.ico' }],
]

describe('getSubdomainAndPath', () => {
    getSubdomainAndPathTestCases.forEach(
        ([input, path]) => {
            test(`${input} ->
                subdomain: ${path.subdomain ?? "null"},
                path: ${path.path ?? "null"}`,
                () => {
                    expect(getSubdomainAndPath(new URL(input))).toEqual(path);
                });
        });
})


const getSubdomainAndPathWithPortalLengthTestCases: [string, DomainDetails][] = [
    ['https://subname.name.sw-tnet.blocksite.net/',
        {subdomain: 'subname.name', path: '/index.html' }],
    ['https://name.sw-tnet.blocksite.net/',
        { subdomain: 'name', path: '/index.html' }],
]
describe('getSubdomainAndPath', () => {
    getSubdomainAndPathWithPortalLengthTestCases.forEach(
        ([input, path]) => {
            test(`${input} ->
                subdomain: ${path.subdomain ?? "null"},
                path: ${path.path ?? "null"}`,
                () => {
                    expect(getSubdomainAndPath(
                        new URL(input), PORTAL_DOMAIN_NAME_LENGTH
                    )).toEqual(path);
                });
        });
})
