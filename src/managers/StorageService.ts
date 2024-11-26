import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable({
    providedIn: 'root'
})

export class StorageService {

    private _storage: Storage | null = null

    constructor(private storage: Storage) {
        this.init()
    }

    async init() {
        const storage = await this.storage.create()
        this._storage = storage
    }

    public async set(key: string, value: any): Promise<any> {
        if (!this._storage) {
            await this._storage
        }
        return this._storage?.set(key, value)
    }

    public async get(key: string): Promise<any> {
        if (!this._storage) {
            await this.init()
        } 
        return this._storage?.get(key)
    }

    public async remove(key: string): Promise<any> {
        if (!this._storage) {
            await this.init()
        }
        return this._storage?.remove(key)
    }

    public async clear(): Promise<void> {
        if (!this._storage) {
            await this.init()
        }
        return this._storage?.clear()
    }

}