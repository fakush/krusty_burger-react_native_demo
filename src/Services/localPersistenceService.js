import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalPersistence {
    constructor() {
        this.storage = AsyncStorage;
    }

    async save(key, value) {
        try {
            await this.storage.setItem(key, value);
        } catch (error) {
            return console.log('🟥 save persistence error: ', error); 
        }
    }

    async saveJson(key, value) {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (error) {
            return console.log('🟥 saveJson persistence error: ', error);
        }
    }

    async get(key) {
        try {
            const value = await this.storage.getItem(key);
            return value;
        } catch (error) {
            return console.log('🟥 get persistence error: ', error); 
        }
    }

    async getJson(key) {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (error) {
            return console.log('🟥 json get persistence error: ', error);
        }
    }

    async clearStorage() {
        try {
            await AsyncStorage.clear();
            return console.log('🟩 localPersistence deleted');
        } catch (error) {
            return console.log('🟥 clear persistence error: ', error);
        }
    }
}

export default new LocalPersistence();