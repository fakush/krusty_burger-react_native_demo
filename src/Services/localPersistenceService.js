import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalPersistence {
    constructor() {
        this.storage = AsyncStorage;
    }

    async save(key, value) {
        // console.log('🟩 persistence: ', key, value);
        try {
            await this.storage.setItem(key, value);
            // return console.log('🟩 persistence response: ', await AsyncStorage.getItem(key));
        } catch (error) {
            return console.log('🟥 save persistence error: ', error); 
        }
    }

    async jsonSave(key, value) {
        try {
            const jsonValue = JSON.stringify(value);
            // console.log('🟩 persistence data: ', key, jsonValue);
            await AsyncStorage.setItem(key, jsonValue);
            // return console.log('🟩 persistence response: ', await AsyncStorage.getItem(key));
        } catch (error) {
            return console.log('🟥 jsonSave persistence error: ', error);
        }
    }

    async get(key) {
        try {
            const value = await this.storage.getItem(key);
            // console.log('🟩 get persistence: ', key, value);
            return value;
        } catch (error) {
            return console.log('🟥 get persistence error: ', error); 
        }
    }

    async jsonGet(key) {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            // console.log('🟩 get json persistence: ', key, jsonValue);
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