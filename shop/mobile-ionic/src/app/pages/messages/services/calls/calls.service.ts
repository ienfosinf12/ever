import { Injectable, Injector } from '@angular/core'
import { AuthService } from 'app/pages/auth/services/auth/auth.service'
import { Extender } from 'shared/helpers/extender'
import { FirestoreService } from 'shared/services/firestore/firestore.service'
import { IUser } from 'app/pages/auth/helpers/model'
import { ICall } from '../../models/call'

@Injectable({
	providedIn: 'root'
})
export class CallsService extends Extender {
	constructor(protected injector: Injector, private authService: AuthService, private firestoreService: FirestoreService) {
		super(injector)
	}

	public async startCall(user: IUser) {
		let sessionToken: string = 'asdfasdf'
		return this.createCall(user, sessionToken)
	}

	private async createCall(user: IUser, sessionToken: string) {
		const { uid } = await this.authService.getUser()
		this.firestoreService.add<ICall>('calls', {
			participantsId: [user.uid, uid],
			sessionToken: sessionToken
		})
	}
}
