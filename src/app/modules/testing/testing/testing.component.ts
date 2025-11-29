// some-page.component.ts
import { Component } from '@angular/core';
import { DynamicZardFormComponent } from '@app/shared/components/dynamic-form/dynamic-form.component';
import { FormConfig } from '@app/shared/components/dynamic-form/dynamic-form.model';
import { ZardCardComponent } from '@app/shared/components/card/card.component';

@Component({
  selector: 'app-some-page',
  standalone: true,
  imports: [DynamicZardFormComponent, ZardCardComponent],
  template: `
    <z-card zTitle="Dynamic ZardUI Form" class="mx-auto p-6">
      <ez-dynamic-form
        [formConfig]="formConfig"
        (submitted)="onFormSubmitted($event)"
      />
    </z-card>
  `,
})
export class TestingComponent {
  formConfig: FormConfig = {
    autoSaveKey: 'customer-form',
    submitLabel: 'Salvar',
    resetLabel: 'Limpar',
    properties: {
      fullName: {
        size: 6,
        label: 'Nome completo',
        type: 'text',
        placeholder: 'Digite o nome completo',
        validators: [
          { type: 'required', message: 'Nome é obrigatório' },
          { type: 'minLength', value: 3 },
        ],
      },
      email: {
        size: 6,
        label: 'Email',
        type: 'text',
        placeholder: 'seu.email@exemplo.com',
        validators: [{ type: 'required' }, { type: 'email' }],
      },
      bio: {
        label: 'Bio',
        type: 'text-area',
        placeholder: 'Fale um pouco sobre você',
        validators: [{ type: 'maxLength', value: 500 }],
        helpText: 'Máximo de 500 caracteres',
      },
      birthDate: {
        size: 6,
        label: 'Data de nascimento',
        type: 'date-picker',
        placeholder: 'Selecione a data',
        validators: [
          { type: 'required' },
        ],
        custom: {
          format: 'dd/MM/yyyy',
          minDate: new Date(2015, 0, 1),
          maxDate: new Date(2025, 0, 1)
        }
      },
      country: {
        size: 6,
        label: 'País',
        type: 'select',
        placeholder: 'Escolha o país',
        options: [
          { key: 'pt', value: 'Portugal' },
          { key: 'br', value: 'Brasil' },
          { key: 'nl', value: 'Holanda' },
        ],
        validators: [{ type: 'required' }],
      },
      plan: {
        size: 6,
        label: 'Plano',
        type: 'radio',
        options: [
          { key: 'basic', value: 'Básico' },
          { key: 'pro', value: 'Pro' },
          { key: 'enterprise', value: 'Enterprise' },
        ],
        initialValue: 'basic',
        custom: { inline: true },
      },
      document: {
        size: 12,
        label: 'Documento',
        type: 'file',
        placeholder: 'Documento de identificação',
      },
      active: {
        size: 6,
        label: 'Ativo',
        type: 'switch',
        placeholder: 'Conta ativa',
        initialValue: true,
      },
      gdpr: {
        size: 12,
        label: 'GDPR',
        type: 'checkbox',
        placeholder: 'Aceito os termos de privacidade',
        initialValue: false,
        validators: [{ type: 'required' }],
      },
    },
  };

  onFormSubmitted(value: any) {
    alert('Form submitted with value: ' + JSON.stringify(value, null, 2));
  }
}
