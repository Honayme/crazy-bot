<?php
public function generate($create = true, $download = true){
        $pdf = PDF::loadView('pdf.ndf-global', ['ndf' => $this]);
        $pdfYear = Carbon::parse($this->mois)->format('Y');
        $pdfMonth = Carbon::parse($this->mois)->format('m');
        $pdfUserName = Tool::wd_remove_accents_space($this->operator->name);
        $pdfUserSurname = Tool::wd_remove_accents_space($this->operator->surname);
        $society = $this->affaireTempsOperator;
        $pdfSociety = $society[0]->societe_facturation->code_societe;
        $pdfName = 'NDF_global_'.$pdfYear.'_'.$pdfMonth.'_'.$pdfSociety.'_'.$pdfUserName.'_'.$pdfUserSurname;
        $pdfDestination =  '/NDF/'.$this->operator->societe->code_societe.
            '/'.
            $pdfYear.'/'.
            $pdfMonth.'/'.
            'NDF_Saisis/NDF_global_'.
            $pdfYear.'_'.
            $pdfMonth.'_'.
            $pdfSociety.'_'.
            $pdfUserName.'_'.
            $pdfUserSurname.'.pdf';

        if($create === true){
            $pdfContent = $pdf->setPaper('A4', 'landscape')->stream()->getContent();
            Storage::disk('public')->put($pdfDestination, $pdfContent);
            Storage::disk('ftp')->put($pdfDestination, $pdfContent);
        }

        if($download === true){
            $contents = Storage::disk('public')->get($pdfDestination);
            $tempFile = 'temp.pdf';
            file_put_contents($tempFile, $contents);
            header('Content-Description: File Transfer');
            header('Content-type: application/pdf');
            header('Content-Disposition: attachment; filename="'.basename($pdfName).'"');
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: ' . filesize($tempFile));
            readfile($tempFile);
            unlink($tempFile);
        }

        Mail::send('backend.emails.ndf_validate', $data, function ($message) use ($data) {
            $message->subject($data['validate']);
            $message->from($data['ndfMailFrom'], app_name());
            $message->to($data['ndfMailManager']);
        });

        Flash::success(trans('alerts.backend.ndf.updatedWithMail', ['model' => $this->modelName, 'ndfIntervenant' => access()->user()->manager]));
    }
?>