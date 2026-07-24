import { Component, Input, OnInit, input, output } from '@angular/core';
import { FilterOption, DefaultOptions } from '../../core/model/';
import { CourtCentre } from '../../core/model/court-centre';
import { OrganisationUnit, OrganisationUnitAutosuggestComponent } from '@cpp/reference-data';
import { PdkCore, PdkForm, PdkSelectComponent } from '@cpp/pdk';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@Component({
  selector: 'hearing-results-filter',
  templateUrl: './hearing-results-filter.component.html',
  styleUrls: ['./hearing-results-filter.component.scss'],
  imports: [
    PdkCore,
    FormsModule,
    PdkForm,
    PdkSelectComponent,
    TranslatePipe,
    CapitalizePipe,
    OrganisationUnitAutosuggestComponent
  ]
})
export class HearingResultsFilterComponent implements OnInit {
  _courtCentres: CourtCentre[];
  readonly dateOptions = input<FilterOption[]>(undefined);
  @Input() set courtCentres(value: CourtCentre[]) {
    if (value) {
      this._courtCentres = value;
      this.courtCentreOptions = this.buildCourtCentreOptions(this._courtCentres);
    }
  }

  get courtCentres() {
    return this._courtCentres;
  }

  readonly filterChange = output<DefaultOptions>();
  courtCentreOptions: FilterOption[];
  selectedCourtCentre: CourtCentre = null;
  selectedOptions: DefaultOptions = {
    dateFilter: null,
    courtHouseFilter: null
  };

  ngOnInit() {
    this.selectedOptions.dateFilter = this.dateOptions().find((date) => date.selected).value;
    this.onDateSelected({ dateFilter: this.selectedOptions.dateFilter });
  }

  buildCourtCentreOptions(courtCentres: CourtCentre[]): FilterOption[] {
    return courtCentres.map(this.buildFilterOption);
  }

  buildFilterOption = (item, index) => {
    return {
      label: item.name,
      value: item.id,
      selected: index === 0
    };
  };

  onCourtCentreSelected(value: OrganisationUnit) {
    if (value && typeof value.id === 'string') {
      this.selectedCourtCentre = this.courtCentres.find((cOpt) => cOpt.id === value.id);
      this.selectedOptions.courtHouseFilter = { id: value.id, name: this.selectedCourtCentre.name };
      this.filterChange.emit({ courtHouseFilter: this.selectedOptions.courtHouseFilter });
    } else {
      this.filterChange.emit({ courtHouseFilter: { id: '', name: '' } });
    }
  }

  onDateSelected(option) {
    this.selectedOptions.dateFilter = Number(option.dateFilter);
    this.filterChange.emit(option);
  }
}
