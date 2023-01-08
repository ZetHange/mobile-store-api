import { Injectable } from '@nestjs/common';

@Injectable()
export class AppsService {
    async getAllApps() {
        const newDate = new Date().toISOString()
        console.log(`${newDate} - выполнение: получение всех приложений`)
        return []
    }
}
