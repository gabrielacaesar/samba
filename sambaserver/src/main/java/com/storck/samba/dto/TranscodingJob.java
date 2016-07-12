package com.storck.samba.dto;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class TranscodingJob {
	
	private Integer id;
	private String createdAt;
	private String finishedAt;
	private JobStatus state;
	private String inputPath;
	private String outputPath;
	private Double progress;
	
	public TranscodingJob() {}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}
	public String getFinishedAt() {
		return finishedAt;
	}
	public void setFinishedAt(String finishedAt) {
		this.finishedAt = finishedAt;
	}
	public JobStatus getState() {
		return state;
	}
	public void setState(JobStatus state) {
		this.state = state;
	}
	public String getInputPath() {
		return inputPath;
	}
	public void setInputPath(String inputPath) {
		this.inputPath = inputPath;
	}
	public String getOutputPath() {
		return outputPath;
	}
	public void setOutputPath(String outputPath) {
		this.outputPath = outputPath;
	}
	public Double getProgress() {
		return progress;
	}
	public void setProgress(Double progress) {
		this.progress = progress;
	}	

}
