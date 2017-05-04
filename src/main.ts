import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { App, routes, providers } from './app'
import { Main, Week, Day, TradeBlock, Help, Auth } from './app/containers'
import { AppBar, ShiftCard, ShiftCreator  } from './app/ui'


@NgModule({
	declarations: [
		App,
		Main,
		AppBar,
		ShiftCard,
		Week,
		Day,
		ShiftCreator,
		TradeBlock,
		Help,
		Auth
	],
	imports: [
		BrowserModule, 
		FormsModule, 
		HttpModule,
		routes
	],
	providers,
	bootstrap: [App]
})
export class AppModule {}
 
platformBrowserDynamic().bootstrapModule(AppModule)