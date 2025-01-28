// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

/**
 * Validates domains and object IDs against a blocklist.
 *
 * Used to check if site::Site objects or SuiNS domains are blocked.
 * Implementations should handle both raw object IDs and domain names.
 */
interface BlocklistChecker {
    /**
     * Checks if the object id or suins domain of a walrus site object is in the blocklist.
     * @param id The object id or suins domain to check if it is in the blocklist.
     * @returns True if the id or suins domain is in the blocklist, false otherwise.
     */
    check: (id: string) => Promise<boolean>

    /**
     * In case of any cleanup needed for the blocklist checker, this method should be called.
     * Examples of cleanup include closing any open connections or releasing resources.
     */
    close?: () => void;
}

export default BlocklistChecker;
