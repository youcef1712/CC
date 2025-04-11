import { Component, computed, inject, signal } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { latLng, Layer, LeafletMouseEvent, MapOptions, tileLayer } from 'leaflet';
import { CartoService } from './services/carto.service';
import { getLayerFromGeoJSON } from './data/geometrie';
import { CommuneComponent } from './components/commune/commune.component';
import { RegionComponent } from './components/region/region.component';
import { DepartementCarto, RegionCarto } from './data/data.carto';
import { Departement } from './data/departement';

@Component({
  selector: 'app-root',
  imports: [
    LeafletModule,
     CommuneComponent,
    // RegionComponent,  // à ajouter quand vous en aurez besoin
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  // Ne pas modifier *
  service=inject(CartoService);
  data=this.service.data

  protected readonly options: MapOptions = {
    zoom: 5,
    zoomControl: false,
    attributionControl: false,
    center: latLng(47, 2.5)
  };

  // Ne pas modifier errorMsg (mais vous pouvez/devez l'utiliser, voir question D)
  private readonly _errorMsg = signal<string | undefined>(undefined);
  protected readonly errorMsg = this._errorMsg.asReadonly();

  /**
   * Réponses aux questions à placer ci-dessous
   */
  private   readonly baseLayer = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' });
  protected readonly allLayers = computed<Layer[]>( // Le tableau doit être mutable d'après la spécification de la bibliothèque ngx-leaflet
    () => [
      this.baseLayer,
      // Ajouter les contours des départements ici
    ]
  )

}
