import { async, TestBed } from '@angular/core/testing';
import { RouteListenerService } from './route-listener.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RouteListenerService', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule]
        }).compileComponents();
    }));
    it('should be created', () => {
        const service: RouteListenerService = TestBed.get(RouteListenerService);
        expect(service).toBeTruthy();
    });
});
