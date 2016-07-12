package com.storck.samba.dto;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class CreateJobRequest {
	
	private String inputPath;

	public String getInputPath() {
		return inputPath;
	}

	public void setInputPath(String inputPath) {
		this.inputPath = inputPath;
	}

}
