import { Component, OnDestroy, OnInit } from '@angular/core';
import { WheaterService } from '../../services/wheater.service';
import { WeatherDatas } from 'src/app/models/interfaces/weather.interface';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-wheater-home',
  templateUrl: './wheater-home.component.html',
  styleUrls: []
})
export class WheaterHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  initialCityName = 'São Paulo';
  wheatherDatas!: WeatherDatas
  searchIcon = faMagnifyingGlass;

  constructor(private weatherService: WheaterService) { }


  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName);
  }

  getWeatherDatas(cityName: string): void {
    this.weatherService.getWheaterDatas(cityName)
      .pipe(takeUntil(this.destroy$)) //descrevendo da assinatura
      .subscribe({
        next: (response) => {
          response && (this.wheatherDatas = response)
          console.log(this.wheatherDatas)
        },
        error: (error) => console.log(error),
      })
  }

  onSubmit(): void {
    this.getWeatherDatas(this.initialCityName);
    this.initialCityName = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

